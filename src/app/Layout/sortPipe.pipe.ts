import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sortPipe",
})
export class SortPipePipe implements PipeTransform {
    transform(Layout_Schema: any): any {
        return Layout_Schema.sort((a: { value: number }, b: { value: number }) => {
            return a["sec"] - b["sec"];
        });
    }
}
