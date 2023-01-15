import { IApplicationWarningMessages } from "../Interfaces/IApplicationWarningMessages";


export enum APPLICATION_WARNING_MESSAGES_ERR_TYPE {
    NO_COMPANY_NAME, NO_POSITION_NAME, NO_LOCATION,
    NO_LINK, INVALID_LINK, NO_JOB_TYPE, NO_STATUS,
}

interface IAction {
    type: APPLICATION_WARNING_MESSAGES_ERR_TYPE
}

export const applicationWarningMessagesInitState: IApplicationWarningMessages = {
    companyName: { visible: false, message: "" },
    positionName: { visible: false, message: "" },
    location: { visible: false, message: "" },
    link: { visible: false, message: "" },
    jobType: { visible: false, message: "" },
    status: { visible: false, message: "" },
}

export function applicationWarningMessagesReducer(state: IApplicationWarningMessages, action: IAction): IApplicationWarningMessages {
    switch (action.type) {
        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_COMPANY_NAME:
            return {
                companyName: { visible: true, message: "This field cannot be empty" },
                positionName: { ...state.positionName, visible: false },
                location: { ...state.location, visible: false },
                link: { ...state.link, visible: false },
                jobType: { ...state.jobType, visible: false },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_POSITION_NAME:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { visible: true, message: "This field cannot be empty" },
                location: { ...state.location, visible: false },
                link: { ...state.link, visible: false },
                jobType: { ...state.jobType, visible: false },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_LOCATION:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { ...state.positionName, visible: false },
                location: { visible: true, message: "This field cannot be empty" },
                link: { ...state.link, visible: false },
                jobType: { ...state.jobType, visible: false },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_LINK:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { ...state.positionName, visible: false },
                location: { ...state.location, visible: false },
                link: { visible: true, message: "This field cannot be empty" },
                jobType: { ...state.jobType, visible: false },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.INVALID_LINK:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { ...state.positionName, visible: false },
                location: { ...state.location, visible: false },
                link: { visible: true, message: "The link is not valid" },
                jobType: { ...state.jobType, visible: false },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_JOB_TYPE:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { ...state.positionName, visible: false },
                location: { ...state.location, visible: false },
                link: { ...state.link, visible: false },
                jobType: { visible: true, message: "This field cannot be empty" },
                status: { ...state.status, visible: false },
            }

        case APPLICATION_WARNING_MESSAGES_ERR_TYPE.NO_STATUS:
            return {
                companyName: { ...state.companyName, visible: false },
                positionName: { ...state.positionName, visible: false },
                location: { ...state.location, visible: false },
                link: { ...state.link, visible: false },
                jobType: { ...state.jobType, visible: false },
                status: { visible: true, message: "This field cannot be empty" },
            }

        default: return applicationWarningMessagesInitState;
    }
}