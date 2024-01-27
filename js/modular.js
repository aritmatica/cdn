async function injectHTML(filePath, elem) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            return;
        }
        const text = await response.text();
        elem.innerHTML = text;
        // reinject all <script> tags
        // for each <script> tag on injected html
        elem.querySelectorAll("script").forEach(script => {
            // create a new empty <script> tag
            const newScript = document.createElement("script");
            // copy attributes of existing script tag 
            // to a new one
            Array.from(script.attributes).forEach(attr =>
                newScript.setAttribute(attr.name, attr.value)
            );
            // inject a content of existing script tag 
            // to a new one
            newScript.appendChild(
                document.createTextNode(script.innerHTML)
            )
            // replace existing script tag to a new one
            script.parentNode.replaceChild(newScript, script);
        })

        injectElem(elem)
    } catch (err) {
        console.error(err.message);
    }
}

function injectTag(tag) {    
    document.querySelectorAll(`${tag}[include]`).forEach((elem) => {
        injectHTML(elem.getAttribute("include"),elem);
    })
}

function injectElem(elem) {
    elem.querySelectorAll("*[include]").forEach((e) => {
        injectHTML(e.getAttribute("include"),e);
    })
}

function injectAll() {
    return new Promise((resolve) => {
        const elements = document.body.querySelectorAll("*[include]")
        var promises = []

        for (let i = 0; i < elements.length; i++) {
            const elem = elements[i];
            promises[i] = injectHTML(elem.getAttribute("include"),elem)
        }
        
        Promise.all(promises).then(resolve)
    })
}

export {injectTag, injectAll, injectElem}