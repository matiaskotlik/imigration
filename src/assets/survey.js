export default {
  "title": "I-589 Questionnaire",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "question1",
          "title": "Name"
        },
        {
          "type": "text",
          "name": "question2"
        },
        {
          "type": "comment",
          "name": "question4",
          "title": "q4",
          "description": "asdffff",
          "defaultValue": "lkuhkuyvkhjy",
          "readOnly": true,
          "placeholder": "asdf"
        },
        {
          "type": "expression",
          "name": "question3",
          "description": "lkj"
        },
        {
          "type": "html",
          "name": "question5",
          "title": "asd",
          "description": "aafasda",
          "html": "<p style=\"font-size: 1.1rem\" >question3"
        }
      ]
    },
    {
      "name": "page2",
      "elements": [
        {
          "type": "text",
          "name": "question6"
        }
      ]
    },
    {
      "name": "page3",
      "elements": [
        {
          "type": "text",
          "name": "question7"
        }
      ]
    }
  ],
  "showTitle": false,
  "autoAdvanceEnabled": true,
  "autoAdvanceAllowComplete": false,
  "questionsOnPageMode": "questionPerPage",
  "headerView": "advanced"
}
