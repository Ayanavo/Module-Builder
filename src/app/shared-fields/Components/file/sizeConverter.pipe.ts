import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sizeConverter",
})
export class SizeConverterPipe implements PipeTransform {
    transform(value: number): string {
        if (value === null || value === undefined || isNaN(value)) return "-";
        if (value === 0) return "0 Bytes";
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(value) / Math.log(1024));
        return parseFloat((value / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
    }
}
