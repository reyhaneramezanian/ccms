import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { randomString } from "src/utils/helper/random";
import { dataURLtoFile } from "src/utils/file/convertToFile";

import styled from "@emotion/styled";
import { MButton } from "../MButton";
import { CloseIcon } from "src/assets/common/CloseIcon";

const StyledWebcamContainer = styled.div({
  position: "fixed",
  left: 0,
  top: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 9999,
  backgroundColor: "#000",
});
const ButtonWrapper = styled.div({
  position: "absolute",
  bottom: 48,
  left: "50%",
  transform: "translate(-50%)",
});

const TakeButton = styled(MButton)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  border: "4px solid #FFF",
  backgroundColor: theme.palette.red.main,
  zIndex: 10,
}));

const CloseButton = styled(MButton)({
  position: "absolute",
  top: 48,
  right: 48,
  zIndex: 10,
  width: 48,
  height: 48,
  backgroundColor: "#FFFFFF66",
});

export const MCamera = ({
  uploadOnFile,
  onClose,
}: {
  uploadOnFile: (_: File) => void;
  onClose: () => void;
}) => {
  const webcamRef = useRef<Webcam | null>(null);

  const onSnapShot = useCallback(() => {
    const imageBase64 = webcamRef.current?.getScreenshot();
    if (imageBase64) {
      const imageSrc = dataURLtoFile(imageBase64, randomString(10));
      if (imageSrc) uploadOnFile(imageSrc);
    }
  }, [uploadOnFile]);

  return (
    <StyledWebcamContainer>
      <Webcam
        style={{
          width: "100%",
          height: "100%",
        }}
        audio={false}
        height={"100vh"}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={"100vw"}
        videoConstraints={{
          width: 1920,
          height: 1080,
          facingMode: { exact: "environment" },
        }}
      />
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <ButtonWrapper>
        <TakeButton onClick={onSnapShot} />
      </ButtonWrapper>
    </StyledWebcamContainer>
  );
};

export const useCamera = () => {
  const [showCamera, setShowCamera] = useState(false);
  return {
    showCamera,
    setShowCamera,
  };
};
