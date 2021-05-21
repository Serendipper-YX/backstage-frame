import React, { useRef, useEffect } from "react";

// 播放vid对应的视频，支持画中画模式
const VideoPlayer = ({ vid, activeKey, enablePip, watchEndTime, onEnded }) => {
  const playerNodeRef = useRef(null);
  const playerInstanceRef = useRef(null);

  const enterPictureInPicture = () => {
    if (document.pictureInPictureElement) {
      return null;
    }
    const { video } = playerInstanceRef.current.HTML5;
    video
      .requestPictureInPicture()
      .then((pipWindow) => {})
      .catch((error) => {
        // Toast.fail('进入画中画模式失败');
      });
  };

  const exitPictureInPicture = () => {
    document.pictureInPictureElement && document.exitPictureInPicture();
  };

  useEffect(() => {
    if (!playerInstanceRef.current) {
      return () => {};
    }
    if (activeKey !== "learn") {
      playerInstanceRef.current.HTML5.pause();
    }
  }, [activeKey]);

  useEffect(() => {
    if (enablePip) {
      enterPictureInPicture();
    } else {
      exitPictureInPicture();
    }
    return () => exitPictureInPicture();
  }, [enablePip]);

  // vid 改变，则重新生成播放器实例
  useEffect(() => {
    const buildPlayer = () => {
      if (playerNodeRef.current && playerInstanceRef.current === null) {
        const initParams = (playerInstanceRef.current = window.polyvPlayer({
          wrap: playerNodeRef.current,
          autoplay: false,
          width: "100%",
          height: "100%",
          forceH5: true,
          ignoreIE: true,
          skinLocation: 2,
          watchEndTime: watchEndTime,
          vid: vid,
          hideSwitchPlayer: true,
          // playsafe: (vid, next) => {
          //   request.get(`/api/client/signature/polyv/token?vid=${vid}`).then(
          //     (data) => {
          //       next(data.token);
          //     },
          //     (err) => console.log(err)
          //   );
          // },
        }));
      }
    };

    const destroyPlayer = () => {
      if (playerInstanceRef.current !== null) {
        playerInstanceRef.current.destroy();
        playerInstanceRef.current = null;
      }
    };

    if (vid) {
      buildPlayer();
      playerInstanceRef.current.HTML5.video.addEventListener("ended", onEnded);
    }
    return () => {
      playerInstanceRef.current.HTML5.video.removeEventListener(
        "ended",
        onEnded
      );
      destroyPlayer();
    };
  }, [vid, watchEndTime]);

  return <div className="video-player" ref={playerNodeRef}></div>;
};

export default VideoPlayer;
