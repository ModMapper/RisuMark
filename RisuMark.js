//@risu-name Risu Mark
addCharaJs(CharacterJS, "front");

function CharacterJS() {
    //@use editDisplay

    const backupRegex = [
        // Escape
        /\\/,
        // HTML Comment
        /<!--[\s\S]*?(-->|$)/,
        // Script Tag
        /<script+([\s\/]+([^=>\s\/]+\s*=\s*("[^"]*"|'[^']*'|[^">\s\/][^>\s\/]*)|[^=>\s\/]+))*[\s\/]*>[\s\S]*?(<\/script+([\s\/]+([^=>\s\/]+\s*=\s*("[^"]*"|'[^']*'|[^">\s\/][^>\s\/]*)|[^=>\s\/]+))*[\s\/]*>|$)/,
        // Style Tag
        /<style+([\s\/]+([^=>\s\/]+\s*=\s*("[^"]*"|'[^']*'|[^">\s\/][^>\s\/]*)|[^=>\s\/]+))*[\s\/]*>[\s\S]*?(<\/style+([\s\/]+([^=>\s\/]+\s*=\s*("[^"]*"|'[^']*'|[^">\s\/][^>\s\/]*)|[^=>\s\/]+))*[\s\/]*>|$)/,
        // HTML Tag
        /<\/?[^>\s\/]+([\s\/]+([^=>\s\/]+\s*=\s*("[^"]*"|'[^']*'|[^">\s\/][^>\s\/]*)|[^=>\s\/]+))*[\s\/]*>/,
        // Risu Tag
        /<[^\s]*>|{{[^\s]*}}/,
    ];
    const combinedRegex = new RegExp(backupRegex.map((r) => r.source).join('|'), "gi");
    const css = "<style>@import url('https://modmapper.github.io/risumark.css')</style>";

    /**
     * @param {string} text
     */
    async function editDisplay(text){
        const stack = [];
        text = backup(text, stack);
        console.log(text);

        // 새 줄
        text = text.replace(/\r?\n/g, "<br/>").replace("\s*<br\/>\s*", "<br/>");
        text = text.replace(/\~/g, '&#x7E;');
        text = text.replace(/[“”]/g, '"');
        
        text = text.replace(/"([^"]*)"/g, '<span class="quote">“$1”</span>');
        text = text.replace(/(`[^`]*`)/g, '<span class="backtick">$1</span>');

        text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<span class="aster3">$1</span>');
        text = text.replace(/\*\*([^*]+)\*\*/g, '<span class="aster2">$1</span>');
        text = text.replace(/\*([^*]+)\*/g, '<span class="aster1">$1</span>');

        text = restore(text, stack);
        return css + '<span class="text">' + text + '</text>';
    }

    function backup(text, stack) {
        return text.replace(combinedRegex, function(value) {
            stack.push(value);
            return "\\";
        });
    }

    function restore(text, stack) {
        return text.replace(/\\/g, () =>  stack.shift());
    }
}