/**
 * Google Form -> Todoist, urgent task on every submission.
 *
 * Field agnostic on purpose: it reads whatever questions the form has, so
 * renaming, adding or reordering questions will not break it.
 *
 * INSTALL (about five minutes, all in the browser)
 *
 *  1. Get a Todoist token: Todoist > Settings > Integrations > Developer >
 *     "API token". Copy it.
 *  2. Open the Google Form > three dots menu > "Apps Script".
 *  3. Delete whatever is in Code.gs and paste this whole file in. Save.
 *  4. Project Settings (the gear on the left) > Script Properties >
 *     "Add script property", twice:
 *        TODOIST_API_TOKEN         = the token from step 1
 *        TODOIST_LEADS_PROJECT_ID  = 6hffPgFPx76jCJPc     (Vincere Corp - Sales)
 *     Leave the project id out entirely and tasks land in the Inbox instead.
 *  5. Back in the editor, pick the function `installTrigger` from the dropdown
 *     and press Run. Approve the permissions prompt when Google asks.
 *  6. Submit a test response to the form. The task should appear immediately.
 *
 * The token lives in Script Properties, never in this file, so the script can
 * be shared or committed without leaking it.
 */

var TASK_LABEL = 'lead';

/** Run this ONCE, from the editor, to attach the submit trigger. */
function installTrigger() {
  var form = FormApp.getActiveForm();
  // Clear any previous copy so running this twice cannot double up the tasks.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'onFormSubmit') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('onFormSubmit').forForm(form).onFormSubmit().create();
  Logger.log('Trigger installed for: ' + form.getTitle());
}

/** Fires on every form submission. */
function onFormSubmit(e) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TODOIST_API_TOKEN');
  if (!token) {
    Logger.log('TODOIST_API_TOKEN is not set in Script Properties. Nothing sent.');
    return;
  }

  var answers = readAnswers(e);
  var title = buildTitle(answers);
  var body = answers
    .map(function (a) {
      return a.question + ': ' + a.answer;
    })
    .join('\n');

  var payload = {
    content: 'NEW LEAD: ' + title,
    description: body + '\n\nSubmitted: ' + new Date().toISOString(),
    due_string: 'today',
    priority: 4, // 4 is urgent in the REST API, which the app shows as p1
    labels: [TASK_LABEL, 'google-form'],
  };

  var projectId = props.getProperty('TODOIST_LEADS_PROJECT_ID');
  if (projectId) payload.project_id = projectId;

  var res = UrlFetchApp.fetch('https://api.todoist.com/rest/v2/tasks', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    // Logged rather than thrown so Google does not disable the trigger after
    // repeated failures. Check Executions in the Apps Script editor.
    Logger.log('Todoist ' + code + ': ' + res.getContentText().slice(0, 300));
    return;
  }
  Logger.log('Task created for: ' + title);
}

/**
 * Pulls question/answer pairs out of the submit event. Handles both the form
 * trigger (e.response) and a spreadsheet trigger (e.namedValues), so this works
 * whether it is bound to the form or to its responses sheet.
 */
function readAnswers(e) {
  var out = [];

  if (e && e.response && typeof e.response.getItemResponses === 'function') {
    e.response.getItemResponses().forEach(function (ir) {
      var v = ir.getResponse();
      if (Array.isArray(v)) v = v.join(', ');
      v = String(v == null ? '' : v).trim();
      if (v) out.push({ question: ir.getItem().getTitle(), answer: v });
    });
    return out;
  }

  if (e && e.namedValues) {
    Object.keys(e.namedValues).forEach(function (k) {
      var v = e.namedValues[k];
      if (Array.isArray(v)) v = v.join(', ');
      v = String(v == null ? '' : v).trim();
      if (v && k !== 'Timestamp') out.push({ question: k, answer: v });
    });
    return out;
  }

  return out;
}

/**
 * Builds the task title from whichever identifying answers exist. Prefers a
 * company, then a name, then an email, and falls back to the first answer so
 * the title is never empty.
 */
function buildTitle(answers) {
  var wanted = ['company', 'business', 'organization', 'organisation', 'name', 'email'];
  var picked = [];

  wanted.forEach(function (key) {
    if (picked.length >= 2) return;
    answers.forEach(function (a) {
      if (picked.length >= 2) return;
      var q = a.question.toLowerCase();
      if (q.indexOf(key) !== -1 && picked.indexOf(a.answer) === -1) picked.push(a.answer);
    });
  });

  if (!picked.length && answers.length) picked.push(answers[0].answer);
  if (!picked.length) return 'Form submission';

  var title = picked.join(' - ');
  return title.length > 110 ? title.slice(0, 107) + '...' : title;
}
