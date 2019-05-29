import TextBox from './textbox';

const guid = require('uuid/v4');
export default class Question {
        componentType = 'question';

        pageId;
        courseId;
        sectionId;
        id = null;
        questionText = '';
        answers = [];
        correctAnswer = '';
        incorrectAnswer = '';
        width = 647;
        height = 482;
        top = 97;
        left = 240;
        parentLim = true;
        zIndex = null;
        active = false;
        imagePath = null;
        styleObject = {}

        constructor(o, store) {
          this.id = guid();
          this.pageId = o.pageId;
          this.courseId = o.courseId;
          this.sectionId = o.sectionId;
          this.questionText = Question.questionTextProps(this.id);
          this.correctAnswer = Question.correctAnswerTextProps(this.id);
          this.incorrectAnswer = Question.incorrectAnswerTextProps(this.id);
          this.answers = Question.answerSamples();
          this.zIndex = o.zIndex;
          this.styleObject = o.styleObject;
        }

        get type() {
          return Question;
        }

        get typeName() {
          return this.type.name;
        }
        static answerSamples() {
          let samples = [
            {
              text: {
                English: 'Banana',
                Finnish: '',
                Swedish: '',
                German: '',
                French: '',
              },
              onEditMode: false,
              isCorrectAnswer: false,
              isChosenAnswer: false,
              id: guid()
            },
            {
              text: {
                English: 'Apple',
                Finnish: '',
                Swedish: '',
                German: '',
                French: '',
              },
              onEditMode: false,
              isCorrectAnswer: false,
              isChosenAnswer: false,
              id: guid()
            },
            {
              text: {
                English: 'Orange',
                Finnish: '',
                Swedish: '',
                German: '',
                French: '',
              },
              onEditMode: false,
              isCorrectAnswer: false,
              isChosenAnswer: false,
              id: guid()
            }];
          return samples;
        }
        static questionTextProps(id) {
          const text = {
            boxText: {
              English: 'Which one of these fruits is the best?',
              Finnish: '',
              Swedish: '',
              German: '',
              French: '',
            },
            id: id,
            font: 'Roboto',
            fontSize: '25px',
            fontColor: '#000000',
            bold: false,
            cursive: false,
            underlined: false,
            color: false,
            align: 'left',
            parentLim: true,
            zIndex: null,
            active: false,
            imagePath: null,
            styleObject: {}
          };

          return text;
        }
        static correctAnswerTextProps(id) {
          const text = {
            boxText: {
              English: 'Correct answer!',
              Finnish: '',
              Swedish: '',
              German: '',
              French: '',
            },
            id: id,
            font: 'Roboto',
            fontSize: '25px',
            fontColor: '#000000',
            bold: false,
            cursive: false,
            underlined: false,
            color: false,
            align: 'left',
            parentLim: true,
            zIndex: null,
            active: false,
            imagePath: null,
            styleObject: {}
          };

          return text;
        }
        static incorrectAnswerTextProps(id) {
          const text = {
            boxText: {
              English: 'Incorrect answer!',
              Finnish: '',
              Swedish: '',
              German: '',
              French: '',
            },
            id: id,
            font: 'Roboto',
            fontSize: '25px',
            fontColor: '#000000',
            bold: false,
            cursive: false,
            underlined: false,
            color: false,
            align: 'left',
            parentLim: true,
            zIndex: null,
            active: false,
            imagePath: null,
            styleObject: {}
          };

          return text;
        }
}
