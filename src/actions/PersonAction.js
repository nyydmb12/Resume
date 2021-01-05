import dispatcher from "../dispatcher";




export function UpdateUser(User_Id) {

    console.log("Actions");
    console.log(User_Id);
    dispatcher.dispatch({
        type: "Set_User", User: {
            Id: User_Id
        }
    });


}