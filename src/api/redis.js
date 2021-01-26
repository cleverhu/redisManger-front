const CommonToFile = "http://redis.deeplythink.com/common/toFile"
const CommonToMySql = "http://redis.deeplythink.com/common/toMySql"

const StringScan = "http://redis.deeplythink.com/string/scan"    //method search cursor
const StringDeleteByKeys = "http://redis.deeplythink.com/string/" //:keys
const StringPost = "http://redis.deeplythink.com/string/"
const StringToFile = "http://redis.deeplythink.com/string/toFile"

const ListScan = "http://redis.deeplythink.com/list/scan"    //method search cursor
const ListGetByKey = "http://redis.deeplythink.com/list/get/" //:key
const ListDeleteByKeys = "http://redis.deeplythink.com/list/" //:keys
const ListPost = "http://redis.deeplythink.com/list/" //
const ListExists = "http://redis.deeplythink.com/list/exists/" //:id
const ListRemove = "http://redis.deeplythink.com/list/remove" //
const ListInsert = "http://redis.deeplythink.com/list/insert" //

const HashScan = "http://redis.deeplythink.com/hash/scan"
const HashGetByKey = "http://redis.deeplythink.com/hash/get/" //:key
const HashDeleteByKeys = "http://redis.deeplythink.com/hash/" //:keys
const HashRemove = "http://redis.deeplythink.com/hash/remove" //
const HashPost = "http://redis.deeplythink.com/hash/" //


const SetScan = "http://redis.deeplythink.com/set/scan"    //method search cursor
const SetGetByKey = "http://redis.deeplythink.com/set/get/" //:key
const SetPost = "http://redis.deeplythink.com/set/"
const SetDeleteByKeys = "http://redis.deeplythink.com/set/" //:keys
const SetRemove = "http://redis.deeplythink.com/set/remove" //
const SetGetCommon = "http://redis.deeplythink.com/set/getCommon" //

const ZSetScan = "http://redis.deeplythink.com/sortedSet/scan"
const ZSetDeleteByKeys = "http://redis.deeplythink.com/sortedSet/" //:keys
const ZSetGetByKey = "http://redis.deeplythink.com/sortedSet/get/" //:key
const ZSetPost = "http://redis.deeplythink.com/sortedSet/"
const ZSetRemove = "http://redis.deeplythink.com/sortedSet/remove" //

const GEOScan = "http://redis.deeplythink.com/geo/scan"
const GEOPost = "http://redis.deeplythink.com/geo/"
const GEODeleteByKeys = "http://redis.deeplythink.com/geo/" //:keys


const ConfigGet = "http://redis.deeplythink.com/config/"         //get all
const ConfigPost = "http://redis.deeplythink.com/config/"

const InfoGet = "http://redis.deeplythink.com/info/"

const UserLogin = "http://redis.deeplythink.com/user/login"
const UserCheck = "http://redis.deeplythink.com/user/check"

const ConnectTest = "http://redis.deeplythink.com/connect/test"
const ConnectSave = "http://redis.deeplythink.com/connect/save"
const ConnectGet = "http://redis.deeplythink.com/connect/get"

const LogsGet = "http://redis.deeplythink.com/logs/get"


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
