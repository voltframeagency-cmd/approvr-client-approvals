import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileText, Image, Palette, FileVideo, FileArchive, type LucideIcon } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFileIcon(fileType: string): LucideIcon {
  const type = fileType?.toLowerCase();
  if (type === 'svg' || type === 'png' || type === 'jpg' || type === 'jpeg' || type === 'gif' || type === 'webp') {
    return Image;
  }
  if (type === 'fig' || type === 'sketch' || type === 'ai' || type === 'psd') {
    return Palette;
  }
  if (type === 'mp4' || type === 'mov' || type === 'avi' || type === 'webm') {
    return FileVideo;
  }
  if (type === 'zip' || type === 'rar' || type === 'tar' || type === 'gz') {
    return FileArchive;
  }
  return FileText;
}
