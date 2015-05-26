var Promise = require("bluebird");

var state_tree = new Sealious.ChipTypes.FieldType("state_tree");   


function StateTree(AvailableStates, RulesOfTransition, InitialState) { 
   this.size = AvailableStates.length;
   this.obj = {};

   for (i = 0; i < RulesOfTransition.length; i = i + 1) { 
      var transition = RulesOfTransition[i];

      if (AvailableStates.indexOf(transition[0]) === -1 || AvailableStates.indexOf(transition[1]) === -1) {
         throw new Error("invalid transition");
      }

      if (this.obj[transition[0]] === undefined)
         this.obj[transition[0]] = [];
      this.obj[transition[0]].push(transition[1]);
   }

   this.CurrentState = InitialState;
}




state_tree.prototype.isProperValue = function(newState, currentState){
      console.log('this.params', this.params)
      console.log("newState: ", newState);
      console.log("currentState: ", currentState);
      if (newState !== undefined && currentState === undefined){
         console.log("A new tree has been initialized")
         return Promise.resolve();
      }
      else if (newState === undefined && currentState === undefined) {
         return Promise.reject();
      }
      else if (newState !== undefined && currentState !== undefined){
         if ((newState <= this.size) && (this.obj[currentState] !== undefined) && this.obj[currentState].indexOf(newState) != -1){
            currentState = newState;
            console.log("Corrent transition");
         } 
         else {
            console.log("Incorrect transition");
         }
      }
   /*
      if ((NewState <= this.size) && (this.obj[this.CurrentState] !== undefined) && (this.obj[this.CurrentState].indexOf(NewState) != -1)) {
         this.CurrentState = NewState;
         console.log("Correct transition");
      }
      else{
         console.log("Incorrect transition");
      }
   */
}

state_tree.prototype.old_value_sensitive = true;
/*

var drzewo = new StateTree(["a",2,3,4], [
   ["a", 5], 
   ["a", 3], 
   ["a", 4], 
   [2, 3], 
   [2, 4]
   ], "a");
drzewo.ChangeState(3);
drzewo.ChangeState(4);
*/