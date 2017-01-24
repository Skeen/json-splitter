var fs = require('fs');
var leftPad = require('left-pad')

var readable = fs.createReadStream("input.json", {
    encoding: 'utf8',
    fd: null,
});

var obj = "";
var depth = 0;
var id = 0;

readable.on('readable', function() 
{
    var chunk;
    while (null !== (chunk = readable.read(1)))
    {
        switch(chunk)
        {
            case '{':
                depth++;
                obj += chunk;
                break;
            case '}':
                depth--;
                obj += chunk;
                if(depth == 0)
                {
                    obj = obj.substr(1);
                    fs.writeFileSync("output" + leftPad(id, 5, '0'), "[" + obj + "]");
                    obj = "";
                    id++;
                }
                break;
            default:
                obj += chunk;
        }
    }
});
