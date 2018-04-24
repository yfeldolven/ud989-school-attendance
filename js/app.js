'use strict';

var modal = {

	days : 12 ,

	students : ['Slappy the Frog','Lilly the Lizard','Paulrus the Walrus',
		'Gregory the Goat','Adam the Anaconda']

};

var control = {
	tableContent : function(){
		view.pageStracture(
			modal.students
		);
	}

};


var view = {

	pageStracture : function(student){
		let table = document.createElement('table'),
			thead = document.createElement('thead'),
			tbody = document.createElement('tbody');
            
		document.body.appendChild(table);
            
		for(let i = 0 ; i < 5 ; i++){//rows
			let tr = document.createElement('tr'),
				trhead = document.createElement('tr');

			if(i==0){
				table.appendChild(thead);
				thead.appendChild(trhead);
				table.appendChild(tbody);
			}

			tbody.appendChild(tr);
            


			for (let s=0 ; s < 12 ; s++){//cols
				let td = document.createElement('td'),
					th = document.createElement('th'),
					tdhead = document.createElement('td'),
					thhead = document.createElement('th'),
					input = document.createElement('input');

				input.setAttribute('type','checkbox');
                    
				if(s==0){
					th.textContent=student[i];
					tr.appendChild(th);
                    
					thhead.textContent='Student Name';
					trhead.appendChild(thhead);
				}

				td.appendChild(input);
				tr.appendChild(td);
                
				tdhead.textContent= s+1 ;
				trhead.appendChild(tdhead);
                
				if(s==11){
					th.textContent=0;
					tr.appendChild(th);
                    
					thhead.textContent='Days Missed-col';
					trhead.appendChild(thhead);
				}
			}
        
		}
        
	},
    

	render : function(){
	}
};




control.tableContent();












/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
	if (!localStorage.attendance) {
		console.log('Creating attendance records...');
		function getRandom() {
			return (Math.random() >= 0.5);
		}

		var nameColumns = $('tbody .name-col'),
			attendance = {};

		nameColumns.each(function() {
			var name = this.innerText;
			attendance[name] = [];

			for (var i = 0; i <= 11; i++) {
				attendance[name].push(getRandom());
			}
		});

		localStorage.attendance = JSON.stringify(attendance);
	}
}());


/* STUDENT APPLICATION */
$(function() {
	var attendance = JSON.parse(localStorage.attendance),
		$allMissed = $('tbody .missed-col'),
		$allCheckboxes = $('tbody input');

	// Count a student's missed days
	function countMissing() {
		$allMissed.each(function() {
			var studentRow = $(this).parent('tr'),
				dayChecks = $(studentRow).children('td').children('input'),
				numMissed = 0;

			dayChecks.each(function() {
				if (!$(this).prop('checked')) {
					numMissed++;
				}
			});

			$(this).text(numMissed);
		});
	}

	// Check boxes, based on attendace records
	$.each(attendance, function(name, days) {
		var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
			dayChecks = $(studentRow).children('.attend-col').children('input');

		dayChecks.each(function(i) {
			$(this).prop('checked', days[i]);
		});
	});

	// When a checkbox is clicked, update localStorage
	$allCheckboxes.on('click', function() {
		var studentRows = $('tbody .student'),
			newAttendance = {};

		studentRows.each(function() {
			var name = $(this).children('.name-col').text(),
				$allCheckboxes = $(this).children('td').children('input');

			newAttendance[name] = [];

			$allCheckboxes.each(function() {
				newAttendance[name].push($(this).prop('checked'));
			});
		});

		countMissing();
		localStorage.attendance = JSON.stringify(newAttendance);
	});

	countMissing();
}());
