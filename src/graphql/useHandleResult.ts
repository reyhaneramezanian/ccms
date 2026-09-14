import { useCallback } from "react";
import { CommonResponse } from "src/@types/graphql.type";

type HandleResult = {
  req: any;
  res: CommonResponse<any>;
  key: string;
  successMsg?: string;
  failMsg?: string;
  onSuccessCallback?: () => void;
  onFailCallback?: () => void;
};

export function useHandleResult(withSnackbar = false) {

  const handleResult = useCallback(
    ({
      req,
      res,
      key,
      successMsg,
      failMsg,
      onSuccessCallback,
      onFailCallback,
    }: HandleResult) => {
      if (res[key].result) {
        // if (withSnackbar) enqueueSnackbar(successMsg, { variant: "success" });
        onSuccessCallback && onSuccessCallback();

        return { success: true, res, req };
      } else {
        // enqueueSnackbar(failMsg || res?.createConsultation?.message, {
        //   variant: "error",
        // });
        onFailCallback && onFailCallback();
        return { success: false, res, req };
      }
    },
    [withSnackbar]
  );

  return { handleResult };
}
