export function restoreUrl(url: string, urlParams: any): string {
    if (url) {
        const link: string = url;
        let resultLink: string = url;
        for (let i = 0; i < link.length; i++) {
            const iw = link[i];
            if (iw !== ":") {
                continue;
            }

            let j = i + 1;
            for (; j < link.length; j++) {
                const jw = link[j];
                if (/\w/.test(jw)) {
                    continue;
                }
                break;
            }

            const searchValue = link.substring(i, j);
            const replaceValue = urlParams[link.substring(i + 1, j)];
            if (replaceValue === undefined) {
                continue;
            }

            resultLink = resultLink.replace(searchValue, replaceValue);
            i = j;
        }
        return resultLink;
    }
    return url;
}

export function changeModalOpen(open: boolean, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    return () => {
        setModalOpen(open);
    };
}

export function checkedChangeWrapper(onCheckedChange: (chcked: boolean) => void) {
    return ({ target: { checked } }: any) => {
        onCheckedChange(checked);
    };
}

export function radioChangeWrapper(onRadioChange: (value: string) => void) {
    return ({ target: { value } }: any) => {
        onRadioChange(value);
    };
}

export function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
