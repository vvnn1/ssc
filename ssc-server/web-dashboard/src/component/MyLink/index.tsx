import { Link, LinkProps, useParams } from "react-router-dom"

const MyLink = (props: LinkProps & React.RefAttributes<HTMLAnchorElement>) => {
    const urlParams = useParams();
    let TO = props.to;
    if (typeof (props.to) === "string") {

        let link: string = TO as string;
        let resultLink: string = TO as string;
        for (let i = 0; i < link.length; i++) {
            const iw = link[i];
            if (iw !== ':') {
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
            const replaceValue = urlParams[link.substring(i+1, j)]
            if(replaceValue === undefined) {
                continue;
            }
            
            resultLink = resultLink.replace(searchValue, replaceValue);
            i=j;
        }
        TO = resultLink;
    }

    return (
        <Link {...props} to={TO}></Link>
    )
};

export default MyLink;