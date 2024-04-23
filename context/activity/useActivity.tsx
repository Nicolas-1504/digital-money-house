import { useContext } from "react";
import { ActivityContext, IActivityContext } from "DMH/context/activity/ActivityContext";

const useActivity = (): IActivityContext => {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error(
            'useActivity must be used within a OrderProvider'
        );
    }
    return context;
};

export default useActivity;