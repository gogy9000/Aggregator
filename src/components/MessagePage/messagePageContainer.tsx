import React from "react";
import {MessagePage} from "./messagePage";
import {Redirect} from "../../hoc/Redirect";


export const MessagePageContainer = Redirect(() => {

        return (
            <div>
                <MessagePage/>
            </div>
        )
    }
)



