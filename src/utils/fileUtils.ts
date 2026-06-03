interface DownloadParams {
  content?: string;
  fileName?: string;
  mimeType?: string;
}

export const downloadFile = (params: DownloadParams) => {
  const { content, mimeType, fileName } = params;
  if (!content) {
    throw new Error("文件内容为空!");
  }

  if (!fileName) {
    throw new Error("文件名为空!");
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
