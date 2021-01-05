import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class PersonStore extends EventEmitter {
    constructor() {
        super()
        this.id = null;




    }
   
    setUserID(User) {
   
        if (User.Id == "") {
            console.log("SetID");
            User.Id = 1;
       
		}
        this.id = User.Id;
        this.emit("change");
        console.log(User);

        console.log(this.id);
       
    }

    getUserID() {
        console.log("GetID");
        console.log(this.id);
        return this.id;
	}


    handleActions(action) {
        switch (action.type) {
            case "Set_User": {
               this.setUserID(action.User)              
                break;
                
            }
            case "FETCH_PersonID":
                {
                    this.getUserID();
                    console.log(this.id);
                    break;
				}
          
            }


        }
    }

const personStore = new PersonStore();
PersonStore.dispatchToken = dispatcher.register(personStore.handleActions.bind(personStore));
window.personStore = personStore;

export default personStore;
