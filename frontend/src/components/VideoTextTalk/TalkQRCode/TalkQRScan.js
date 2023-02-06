import React from "react";
import { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next/hooks";
import Img from "react-cool-img";
import QrReader from 'react-qr-reader';

// import Button from "../../../Button/Button";
import Loader from "../../Loader/Loader";

import { useStore } from "../../../hook-store/store";
import { addAcceptUserId } from "../../../util/talk/talk-permission";


import classes from "./TalkQRScan.module.css";
import { BASE_URL } from "../../../App";

const TalkQRScan = (props) => {
  // console.log("TalkUserListControllContents.js-props", props);

  const {
    // userId,
    // usersData,
    // favoriteUsers, 
    // editFavoriteUsersHandler,
    // editFavoriteUsersResult,
    // noconnectGetUserDestTalkHandler,
    // showNoconnectTextTalk,
    // showNoconnectTextTalkHandler,
    // noconnectDestUserIdHandler,
    // isLoading,
  } = props;

  const [t] = useTranslation("translation");

  const [store, dispatch] = useStore();
  // console.log('store-TalkUserListControlQRcode', store);
  const { talkPermission } = store.talkPermission;

  const [result, setResult] = useState('No result');
  const [scanFinish, setScanFinish] = useState(false);
  const [acceptFinish, setAcceptFinish] = useState(false);
  const [error, setError] = useState('');

  // const [qrToken, setQrToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (result) {
  //     console.log(result, scanFinish);
  //   }
  // },[result, scanFinish]);

	const handleError = (err) => {
		console.err(err)
	}

	const handleScan = async (result) => {
    try {
      if (scanFinish) {
        return;
      }
  
      console.log(result);
  
      if(result) {
        // console.log(result);
        setResult(result);
  
        const resultObj = JSON.parse(result);
        console.log(resultObj);
  
        if (resultObj.token) {
          setScanFinish(true);
  
          const acceptedResult = await addAcceptUserIdHandler(
            BASE_URL,
            resultObj.token,
            localStorage.getItem('userId'),
            true,
          );
    
          const acceptDistResult = await addAcceptUserIdHandler(
            BASE_URL,
            localStorage.getItem('token'),
            resultObj.userId,
          );

          setAcceptFinish(true);
        }
    
      }

    } catch(err) {
      console.log(err);
      setError('add-user-failed');
    }

	}

  const addAcceptUserIdHandler = async (url, token, acceptUserId, isQRToken) => {
    try {

      setIsLoading(true);

      const result = await addAcceptUserId(url, token, acceptUserId, isQRToken);
      
      console.log(result);

      if (result.data) {
        dispatch('SET_TALKPERMISSION', result.data);
      }

      setIsLoading(false);
      return result;

    } catch(err) {
      console.log(err);
      setIsLoading(false);
      throw err;
    }
  };

	const previewStyle = {
		height: 240,
		width: 320,
	}


  let talkQRScanBody = (
    <div>
      <div>Scan Other User's QR Code to talk</div>
      <div className={classes.container}>
        <QrReader
          // delay={500}
          delay={1000}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          onResult={handleScan}
        />

        {isLoading && (
          <Loader />
        )}

        {/* <div className={classes.result}>
          {result && scanFinish && 'scan-finish'}
        </div> */}

        <div className={classes.result}>
          {error}
        </div>
        {/* <div className={classes.result}>
          {result && <div>{result}</div>}
        </div>		 */}
      </div>
    </div>
  );

  if (acceptFinish) {
    talkQRScanBody = (
      <div>add-user-success</div>
    )
  }


  return (
    <Fragment>
      <div>{talkQRScanBody}</div>
    </Fragment>
  );
};

export default TalkQRScan;