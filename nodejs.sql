/*
Navicat MySQL Data Transfer

Source Server         : ii
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : nodejs

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2018-07-17 17:31:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `grade`
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade` (
  `userid` int(50) NOT NULL,
  `rank` int(10) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES ('19439', '0');
INSERT INTO `grade` VALUES ('27898', '0');
INSERT INTO `grade` VALUES ('28115', '0');
INSERT INTO `grade` VALUES ('50187', '0');
INSERT INTO `grade` VALUES ('56250', '0');
INSERT INTO `grade` VALUES ('59977', '0');
INSERT INTO `grade` VALUES ('65391', '0');
INSERT INTO `grade` VALUES ('77906', '0');
INSERT INTO `grade` VALUES ('83073', '0');
INSERT INTO `grade` VALUES ('87207', '1');
INSERT INTO `grade` VALUES ('91982', '0');
INSERT INTO `grade` VALUES ('92278', '0');
INSERT INTO `grade` VALUES ('96394', '0');
INSERT INTO `grade` VALUES ('98126', '0');

-- ----------------------------
-- Table structure for `indent`
-- ----------------------------
DROP TABLE IF EXISTS `indent`;
CREATE TABLE `indent` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `userid` int(50) NOT NULL,
  `shopid` varchar(255) CHARACTER SET utf8 NOT NULL,
  `state` int(10) NOT NULL,
  `shopname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `amount` int(10) NOT NULL,
  `prick` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createTime` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of indent
-- ----------------------------
INSERT INTO `indent` VALUES ('1531728496607702398', '19439', '131810108098900', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '88.8', 'Mon Jul 16 2018 16:08:16 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531728514740164998', '19439', '321316589716178', '1', '雨晨回转寿司优惠拼团只要49.9元就能任性吃，机会仅此一次，错过要等一辈子喔！', '1', '49.9', 'Mon Jul 16 2018 16:08:34 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531732153162010369', '19439', '211505785933547', '2', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Mon Jul 16 2018 17:09:13 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531732187204737280', '19439', '131810108098900', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '88.8', 'Mon Jul 16 2018 17:09:47 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531734879098926908', '19439', '211505785933547', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Mon Jul 16 2018 17:54:39 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531735307955083790', '19439', '211505785933547', '3', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Mon Jul 16 2018 18:01:47 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531735357348364935', '19439', '211505785933547', '3', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Mon Jul 16 2018 18:02:37 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531735481101725379', '19439', '211505785933547', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Mon Jul 16 2018 18:04:41 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531795534681658703', '28115', '321316589716178', '1', '雨晨回转寿司优惠拼团只要49.9元就能任性吃，机会仅此一次，错过要等一辈子喔！', '1', '49.9', 'Tue Jul 17 2018 10:45:34 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531815047712979493', '77906', '211505785933547', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Tue Jul 17 2018 16:10:47 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531815355577706281', '77906', '321316589716178', '1', '雨晨回转寿司优惠拼团只要49.9元就能任性吃，机会仅此一次，错过要等一辈子喔！', '1', '49.9', 'Tue Jul 17 2018 16:15:55 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531815456491872601', '19439', '321316589716178', '1', '雨晨回转寿司优惠拼团只要49.9元就能任性吃，机会仅此一次，错过要等一辈子喔！', '1', '49.9', 'Tue Jul 17 2018 16:17:36 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531815592150630245', '19439', '211505785933547', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Tue Jul 17 2018 16:19:52 GMT+0800 (中国标准时间)');
INSERT INTO `indent` VALUES ('1531817132399924784', '19439', '211505785933547', '1', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '1', '99.9', 'Tue Jul 17 2018 16:45:32 GMT+0800 (中国标准时间)');

-- ----------------------------
-- Table structure for `shoplist`
-- ----------------------------
DROP TABLE IF EXISTS `shoplist`;
CREATE TABLE `shoplist` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `prick` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `old_prick` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `sold` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `createTime` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `finesTime` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shoplist
-- ----------------------------
INSERT INTO `shoplist` VALUES ('131810108098900', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '88.8', '128.00', '1123', 'Fri Jul 13 2018 17:32:17 GMT+0800 (中国标准时间)', 'Fri Jul 17 2018 10:22:17 GMT+0800 (中国标准时间)');
INSERT INTO `shoplist` VALUES ('211505785933547', '俄罗斯红菜汤,一种在东欧广泛流行的菜式，以红菜为主要材料，保留红菜基本的色调和口感！', '99.9', '138.00', '300', 'Fri Jul 13 2018 11:47:03 GMT+0800 (中国标准时间)', 'Fri Jul 30 2018 11:47:03 GMT+0800 (中国标准时间)');
INSERT INTO `shoplist` VALUES ('321316589716178', '雨晨回转寿司优惠拼团只要49.9元就能任性吃，机会仅此一次，错过要等一辈子喔！', '49.9', '99.00', '2000', 'Fri Jul 13 2018 11:32:07 GMT+0800 (中国标准时间)', 'Fri Jul 26 2018 11:32:07 GMT+0800 (中国标准时间)');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(50) NOT NULL DEFAULT '0',
  `user` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('19439', '222', 'NTZiMDgwZDk5MjZkYmVjNGVkYmZlN2Q2MjdlZDEwMjc=', 'Fri Jul 13 2018 11:44:08 GMT+0800 (中国标准时间)');
INSERT INTO `user` VALUES ('28115', '2223', 'NTZiMDgwZDk5MjZkYmVjNGVkYmZlN2Q2MjdlZDEwMjc=', 'Mon Jul 16 2018 18:52:12 GMT+0800 (中国标准时间)');
INSERT INTO `user` VALUES ('59977', '123', 'NTZiMDgwZDk5MjZkYmVjNGVkYmZlN2Q2MjdlZDEwMjc=', 'Mon Jul 16 2018 18:43:39 GMT+0800 (中国标准时间)');
INSERT INTO `user` VALUES ('77906', 'szx', 'Yzk0ZDZjNWEyN2QzYjY0OGQ4NDc5ZDFiZjNkOTllMGM=', 'Tue Jul 17 2018 16:10:35 GMT+0800 (中国标准时间)');
