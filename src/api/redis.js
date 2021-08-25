const CommonToFile = "http://redismanger.study-k8s.com/common/toFile"
const CommonToMySql = "http://redismanger.study-k8s.com/common/toMySql"

const StringScan = "http://redismanger.study-k8s.com/string/scan"    //method search cursor
const StringDeleteByKeys = "http://redismanger.study-k8s.com/string/" //:keys
const StringPost = "http://redismanger.study-k8s.com/string/"
const StringToFile = "http://redismanger.study-k8s.com/string/toFile"

const ListScan = "http://redismanger.study-k8s.com/list/scan"    //method search cursor
const ListGetByKey = "http://redismanger.study-k8s.com/list/get/" //:key
const ListDeleteByKeys = "http://redismanger.study-k8s.com/list/" //:keys
const ListPost = "http://redismanger.study-k8s.com/list/" //
const ListExists = "http://redismanger.study-k8s.com/list/exists/" //:id
const ListRemove = "http://redismanger.study-k8s.com/list/remove" //
const ListInsert = "http://redismanger.study-k8s.com/list/insert" //

const HashScan = "http://redismanger.study-k8s.com/hash/scan"
const HashGetByKey = "http://redismanger.study-k8s.com/hash/get/" //:key
const HashDeleteByKeys = "http://redismanger.study-k8s.com/hash/" //:keys
const HashRemove = "http://redismanger.study-k8s.com/hash/remove" //
const HashPost = "http://redismanger.study-k8s.com/hash/" //


const SetScan = "http://redismanger.study-k8s.com/set/scan"    //method search cursor
const SetGetByKey = "http://redismanger.study-k8s.com/set/get/" //:key
const SetPost = "http://redismanger.study-k8s.com/set/"
const SetDeleteByKeys = "http://redismanger.study-k8s.com/set/" //:keys
const SetRemove = "http://redismanger.study-k8s.com/set/remove" //
const SetGetCommon = "http://redismanger.study-k8s.com/set/getCommon" //

const ZSetScan = "http://redismanger.study-k8s.com/sortedSet/scan"
const ZSetDeleteByKeys = "http://redismanger.study-k8s.com/sortedSet/" //:keys
const ZSetGetByKey = "http://redismanger.study-k8s.com/sortedSet/get/" //:key
const ZSetPost = "http://redismanger.study-k8s.com/sortedSet/"
const ZSetRemove = "http://redismanger.study-k8s.com/sortedSet/remove" //

const GEOScan = "http://redismanger.study-k8s.com/geo/scan"
const GEOPost = "http://redismanger.study-k8s.com/geo/"
const GEODeleteByKeys = "http://redismanger.study-k8s.com/geo/" //:keys


const ConfigGet = "http://redismanger.study-k8s.com/config/"         //get all
const ConfigPost = "http://redismanger.study-k8s.com/config/"

const InfoGet = "http://redismanger.study-k8s.com/info/"

const UserLogin = "http://redismanger.study-k8s.com/user/login"
const UserCheck = "http://redismanger.study-k8s.com/user/check"

const ConnectTest = "http://redismanger.study-k8s.com/connect/test"
const ConnectSave = "http://redismanger.study-k8s.com/connect/save"
const ConnectGet = "http://redismanger.study-k8s.com/connect/get"

const LogsGet = "http://redismanger.study-k8s.com/logs/get"


export default {
  GEOScan,
  GEOPost,
  GEODeleteByKeys,
  CommonToFile,
  CommonToMySql,
  StringScan,
  StringDeleteByKeys,
  StringPost,
  StringToFile,
  ListScan,
  ListGetByKey,
  ListDeleteByKeys,
  ListPost,
  ListExists,
  ListRemove,
  ListInsert,
  HashScan,
  HashDeleteByKeys,
  HashGetByKey,
  HashRemove,
  HashPost,
  SetScan,
  SetDeleteByKeys,
  SetGetByKey,
  SetPost,
  SetRemove,
  SetGetCommon,
  ZSetScan,
  ZSetDeleteByKeys,
  ZSetGetByKey,
  ZSetPost,
  ZSetRemove,
  ConfigGet,
  ConfigPost,
  InfoGet,
  UserLogin,
  UserCheck,
  ConnectTest,
  ConnectSave,
  ConnectGet,
  LogsGet
}
