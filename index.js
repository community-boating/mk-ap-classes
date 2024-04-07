const fs = require('fs')
const data = fs.readFileSync("data.tsv", "utf-8")

const instances = data.split("\n").map(line => {
	const [formatId, typeName, classDate, startTime, duration] = line.split("\t");
	const [durationHours, durationMinutes] = duration.split(":")
	return {formatId, typeName, classDate, startTime,durationHours, durationMinutes}
})

console.log("UPDATE THIS SCRIPT to set signup min/max!")
process.exit(1)

console.log("declare");
console.log("  l_instance_id number;");
console.log("begin");

instances.forEach(i => {
	const duration = Number(i.durationHours) + (Number(i.durationMinutes)/60)
	console.log("l_instance_id := ap_class_instances_seq.nextval;")
	console.log(`insert into ap_class_instances (instance_id, format_id) values (l_instance_id, ${i.formatId});`)
	console.log(`insert into ap_class_sessions (instance_id, session_datetime, session_length) 
	             values (l_instance_id, to_date('${i.classDate} ${i.startTime}','MM/DD/YYYY HH:MI PM'), ${duration} );`)
})

console.log("end;")
