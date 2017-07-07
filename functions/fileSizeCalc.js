function fileSizeCalc(fileSize) {
  if (fileSize < 1024) {
    fileSize += 'B';
  } else if (fileSize >= 1024 && fileSize < Math.pow(1024, 2)) {
    fileSize = Math.round(fileSize / 1024) + 'KB';
  } else if (fileSize >= Math.pow(1024, 2) && fileSize < Math.pow(1024, 3)) {
    fileSize = Math.round((fileSize * 100) / Math.pow(1024, 2)) / 100 + 'MB';
  } else if (fileSize >= Math.pow(1024, 3) && fileSize < Math.pow(1024, 4)) {
    fileSize = Math.round((fileSize * 100) / Math.pow(1024, 3)) / 100 + 'GB';
  } else if (fileSize >= Math.pow(1024, 4) && fileSize < Math.pow(1024, 5)) {
    fileSize = Math.round((fileSize * 100) / Math.pow(1024, 4)) / 100 + 'TB';
  } else if (fileSize >= Math.pow(1024, 5)) {
    fileSize = Math.round((fileSize * 100) / Math.pow(1024, 5)) / 100 + 'PB';
  }

  return fileSize;
}

module.exports = fileSizeCalc;
