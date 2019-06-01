const guid = require('uuid/v4');

export default class Group {

        id = null;
        teams = [];
        groupNumber = null;

        constructor(o, store) {
          this.id = guid();
          this.teams = o.teams;
          this.groupNumber = o.groupNumber;
        }
}
