import LiveRoomDao from './LiveRoomDao';
import pkg from '../../../package.json';

const prefixKey = 'config';

const resentLiveData = LiveRoomDao.getResent();

//配置信息管理
export const defaultConfig: ConfigStateType = {
  version: pkg.version, //当前版本号
  latestVersion: pkg.version, //最新版本号
  languageCode: 'zhCn',
  setAlwaysOnTop: 0, //窗口置顶：默认不置顶
  roomid: resentLiveData.roomid,  //直播间ID
  shortid: resentLiveData.shortid, //短ID,这个字段和直播间ID一样，也不知道有啥区别
  ignoreMouse: 0, //默认鼠标穿透：不穿透
  showAvatar: 1, //默认显示头像
  avatarSize: 24,
  showFanLabel: 1, //默认显示粉丝勋章
  showLvLabel: 1, //默认显示等级
  showVip: 1, //默认显示姥爷
  backgroundColor: 1, //背景颜色, 默认骚紫色
  backgroundOpacity: 0.5, //背景透明度
  fontFamily: '',
  fontSize: 17,
  fontLineHeight: 24,
  fontMarginTop: 3,
  blockScrollBar: 0,
  showVoice: 0,
  voiceVolume: 0.3,
  voiceSpeed: 1,
  autoTranslate: 0,
  translateFrom: 'auto',
  translateTo: 'ja',
  maxMessageCount: 500,
  taskMaxLength: 5,
  voiceTranslateTo: 'zhCn',
  blockMode: 0,
  blockEffectItem0: 0,
  blockEffectItem1: 0,
  blockEffectItem2: 1,
  blockEffectItem3: 0,
  blockEffectItem4: 0,
  blockEffectItem5: 0,
  blockMinGoldSeed: 0,
  blockMinSilverSeed: 0,
  blockDanmakuLists: [],
  blockUserLists: [],
  blockUserLv: 0,
  blockUserNotMember: 0,
  blockUserNotBindPhone: 0,
  showTransition: 1,
  showGiftDanmakuList: 0,
  maxDanmakuGiftCount: 30,
  danmakuGiftListHeight: 200,
};

export default class ConfigDao {
  static get(): ConfigStateType {
    const configStr = localStorage.getItem(prefixKey);
    if (!configStr) return defaultConfig;
    const configData: ConfigStateType = {
      ...defaultConfig,
      ...JSON.parse(configStr),
    };
    configData.version = pkg.version;
    // 与最新版config合并
    this.save(configData);
    return configData;
  }

  static save(config: ConfigStateType) {
    localStorage.setItem(prefixKey, JSON.stringify(config));
  }

  static reset(): ConfigStateType {
    localStorage.removeItem(prefixKey);
    this.save(defaultConfig);
    return defaultConfig;
  }
}
