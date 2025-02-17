import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tooltip from 'rc-tooltip';
import MsgVip from './MsgVip';
import MsgUserAvatar from './MsgUserAvatar';
import { ConfigKey } from '../../../reducers/types';
import { currentTranslateToCode, translate } from '../../../utils/translation';
import { openLink } from '../../../utils/common';
import voice from '../../../utils/voice';
import StyledDao, { StyledDaoNS } from '../../../dao/StyledDao';
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectConfig, updateConfig } from "../../../store/features/configSlice";
import { useTranslation } from "react-i18next";

/**
 * userName 样式
 * eg:
 * const UserWrapper =  styled.span`
 *    text-shadow: 1px 1px 2px #E91E63, 0 0 0.2em #E91E63;
 * `
 * */
const UserWrapperStr = StyledDao.get(StyledDaoNS.UserWrapper);
const UserWrapper = styled.span`
  ${UserWrapperStr}
`;

// content 样式
const ContentWrapperStr = StyledDao.get(StyledDaoNS.ContentWrapper);
const ContentWrapper = styled.span`
  ${ContentWrapperStr}
`;

function MsgDanmu(props: DanmakuMsg) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const config = useAppSelector(selectConfig);

  const [showToolTip, setShowToolTip] = useState(false);
  let [translateContent, setTranslateContent] = useState(props.content);

  // 翻译文字
  const handleTranslate = () => {
    translate(props.content, {
      from: 'auto',
      to: currentTranslateToCode()
    })
      .then(translateObj => {
        translateContent = `${translateObj.text}`;
        setTranslateContent(translateContent);
      })
      .catch((e: any) => {
        console.log(e);
        translateContent = `${props.content}(${t('TranslateFailed')})`;
        setTranslateContent(translateContent);
      })
      .finally(() => {
        setShowToolTip(false);
      });
  };

  useEffect(() => {
    if (config.autoTranslate === 1) {
      handleTranslate();
    }
  }, []);

  // 屏蔽用户
  const handleBlockUser = (uid: number) => {
    let blockUserLists = JSON.parse(JSON.stringify(config.blockUserLists));
    blockUserLists.push(uid);
    blockUserLists = [...new Set(blockUserLists)];
    dispatch(updateConfig({ k: ConfigKey.blockUserLists, v: blockUserLists }));
    setShowToolTip(false);
  };

  // 屏蔽对应弹幕文字
  const handleBlockDanmaku = (text: string) => {
    let blockDanmakuLists = JSON.parse(JSON.stringify(config.blockDanmakuLists));
    blockDanmakuLists.push(text);
    blockDanmakuLists = [...new Set(blockDanmakuLists)];
    dispatch(updateConfig({ k: ConfigKey.blockDanmakuLists, v: blockDanmakuLists }));
    setShowToolTip(false);
  };

  const handleReadDanmaku = (uname: string, text: string) => {
    voice.resetPush(uname, text);
  };

  const danmakuActionMenu = (uid: number, uname: string, text: string) => {
    return (
      <div className="danmakuActionMenu">
        <span className="danmakuActionMenuUser pointer" onClick={() => openLink(`https://space.bilibili.com/${uid}`)}>{uname}</span>
        <span className="danmakuActionMenuItem pointer" onClick={handleTranslate}>{t('DanmakuTranslate')}</span>
        <span className="danmakuActionMenuItem pointer" onClick={() => handleReadDanmaku(uname, text)}>{t('DanmakuRead')}</span>
        <span className="danmakuActionMenuItem pointer" onClick={() => handleBlockUser(uid)}>{t('DanmakuBlockUser')}</span>
        <span className="danmakuActionMenuItem pointer" onClick={() => handleBlockDanmaku(text)}>{t('DanmakuBlockSimilar')}</span>
      </div>
    )
  }

  return (
    <div className={["danmakuItem", props.guardLevel ? `danmakuItem danmaku-item ${config.blockEffectItem5 === 0 ? `guard-level-${props.guardLevel}` : '' } guard-danmaku` : ''].join(' ')}>
      {
        config.showAvatar === 1 && MsgUserAvatar(props.userID, props.face)
      }
      {
        props.isAdmin && <div className="admin-icon dp-i-block v-middle" />
      }
      <i
        className={['v-middle bg-center bg-no-repeat pointer', props.guardLevel ? `dp-i-block guard-icon guard-level-${props.guardLevel}` : ''].join(' ')} />
      <MsgVip {...props} />
      {
        props.fanLv && config.showFanLabel === 1 && (
          <div className="fans-medal-item-ctnr dp-i-block p-relative v-middle">
            <div className={ [props.fanLv && `fans-medal-item level-${ props.fanLv > 20 ? 20 : props.fanLv}`] }>
              <span className="label">{ props.fanName }</span>
              <span className="level">{ props.fanLv }</span>
            </div>
          </div>
        )
      }
      {
        config.showLvLabel === 1 && <div className={`user-level-icon dp-i-block p-relative v-middle ${props.userLevel && `lv-${props.userLevel}`}`}>UL {props.userLevel}</div>
      }
       <span className={`user-name v-middle pointer open-menu ${props.guardLevel ? 'guard' : ''}`}>
         <UserWrapper>
           {props.username}:
         </UserWrapper>
      </span>
      <Tooltip
        visible={showToolTip}
        animation="zoom"
        placement="top"
        onVisibleChange={v => setShowToolTip(v)}
        trigger="click"
        overlay={danmakuActionMenu(props.userID, props.username, props.content)}
      >
        <span className="danmaku-content v-middle pointer ts-dot-2 open-menu">
          <ContentWrapper>
            {translateContent}
            {props.repeat > 0 && (<span className={`repeatNum repeat-num-${props.repeat}`}>{props.repeat}</span>)}
          </ContentWrapper>
        </span>
      </Tooltip>
    </div>
  );
}

export default memo(MsgDanmu);
