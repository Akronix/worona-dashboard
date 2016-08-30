import * as types from '../types';

export const corePackagesRequested = () =>
  ({ type: types.CORE_PACKAGES_REQUESTED });
export const corePackagesSucceed = ({ pkgs }) =>
  ({ type: types.CORE_PACKAGES_SUCCEED, pkgs });
export const corePackagesFailed = ({ error }) =>
  ({ type: types.CORE_PACKAGES_FAILED, error });

let uniqueId = 0;
export const packagesAdditionRequested = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_ADDITION_REQUESTED, pkgs, uid: uid || uniqueId++ });
export const packagesAdditionFailed = ({ error, pkg, uid }) =>
  ({ type: types.PACKAGES_ADDITION_FAILED, error, pkg, uid });
export const packagesAdditionSucceed = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_ADDITION_SUCCEED, pkgs, uid });

export const packagesDownloadRequested = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_REQUESTED, pkgs, uid });
export const packagesDownloadSucceed = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_SUCCEED, pkgs, uid });
export const packagesDownloadFailed = ({ error, pkg, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_FAILED, error, pkg, uid });

export const packageDownloadRequested = ({ pkg, uid }) =>
  ({ type: types.PACKAGE_DOWNLOAD_REQUESTED, pkg, uid });
export const packageDownloadSucceed = ({ pkg, uid }) =>
  ({ type: types.PACKAGE_DOWNLOAD_SUCCEED, pkg, uid });
export const packageDownloadFailed = ({ error, pkg, uid }) =>
  ({ type: types.PACKAGE_DOWNLOAD_FAILED, error, pkg, uid });

export const packagesLoadRequested = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_LOAD_REQUESTED, pkgs, uid });
export const packagesLoadSucceed = ({ pkgs, uid }) =>
  ({ type: types.PACKAGES_LOAD_SUCCEED, pkgs, uid });
export const packagesLoadFailed = ({ error, pkgs, uid }) =>
  ({ type: types.PACKAGES_LOAD_FAILED, error, pkgs, uid });

export const packageLoadRequested = ({ pkg, uid }) =>
  ({ type: types.PACKAGE_LOAD_REQUESTED, pkg, uid });
export const packageLoadSucceed = ({ pkg, uid }) =>
  ({ type: types.PACKAGE_LOAD_SUCCEED, pkg, uid });
export const packageLoadFailed = ({ error, pkg, uid }) =>
  ({ type: types.PACKAGE_LOAD_FAILED, error, pkg, uid });

export const themeChangeRequested = ({ name, namespace }) =>
  ({ type: types.THEME_CHANGE_REQUESTED, name, namespace });
export const themeChangeStarted = ({ name, namespace }) =>
  ({ type: types.THEME_CHANGE_STARTED, name, namespace });
export const themeChangeSucceed = ({ name, namespace }) =>
  ({ type: types.THEME_CHANGE_SUCCEED, name, namespace });
export const themeChangeFailed = ({ error, name }) =>
  ({ type: types.THEME_CHANGE_FAILED, error, name });
