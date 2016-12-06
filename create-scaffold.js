var path = require('path');
var fs = require('fs');
var fsTools = require('fs-tools');
var templatePath = path.join(path.dirname(__filename), 'template');

var createScffold = function(projectName) {
	var targetDir = path.join(process.cwd(), projectName);
	fsTools.copy(templatePath, targetDir, function() {
		fsTools.walk(targetDir, function(path, stats) {

			var raw, replaced;

			if (stats.isFile()) {
				raw = fs.readFileSync(path, 'utf8');
				// console.log(raw);
				replaced = raw.replace(/\$name/g, projectName);
				fs.writeFileSync(path, replaced, 'utf8');
			}
		});

	});
}

module.exports = createScffold;