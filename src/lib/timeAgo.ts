export const timeAgo = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) diffInSeconds = 0;

    if (diffInSeconds < 3600) {
        return Math.floor(diffInSeconds / 60) === 0 ? "Az önce" : `${Math.floor(diffInSeconds / 60)} dakika önce`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    } else if (diffInSeconds < 604800) {
        return `${Math.floor(diffInSeconds / 86400)} gün önce`;
    } else if (diffInSeconds < 2592000) {
        return `${Math.floor(diffInSeconds / 604800)} hafta önce`;
    } else if (diffInSeconds < 31536000) {
        return `${Math.floor(diffInSeconds / 2592000)} ay önce`;
    } else {
        return "1 yıldan fazla süre önce";
    }
};