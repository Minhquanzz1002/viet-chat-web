export interface UploadFileRequestDTO {
    filename: string;
    type: 'AVATAR' | 'COVER_IMAGE' | 'MESSAGE';
}