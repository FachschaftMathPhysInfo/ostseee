const translate= (text,langCode)=>{
    return text[langCode]||text[Object.keys(text)[0]] ||""
}
export default translate;