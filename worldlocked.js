document.addEventListener("DOMContentLoaded", function() {

//var consumable_condition = null;
//    function initialize(){
//        $(document).tooltip({
//            content: function () {
//                return this.getAttribute("title");
//            },
//            position: {
//                my: "left top-10",
//                at: "right top",
//                collision: "flipfit"
//            },
//            classes: {
//                "ui-tooltip": "definition"
//            }
//        
//        });
//        
//        //randomize what dataset/condition the participant is in?
//
//        if ("c_set" in variables && variables['c_set'].length > 0) {
//          getConsumables("explainable_ai", variables['c_set'], 1, setCondition);
//        } else {
//          var d = jsPsych.randomization.sampleWithoutReplacement(["Census", "Compas"],1)[0]
//          var c = jsPsych.randomization.sampleWithoutReplacement(["Control", "AI", "AI_expl"],1)[0]
//          conditionReady(d,c);
//        }
//    }
//
//    function setCondition(c, err) {
//        consumable_condition = c;
//        c = JSON.parse(c[0]);
//        //console.log("setCondition",c);
//        conditionReady(c[0],c[1]);
//    }

    //function conditionReady(d,c) {
    var conditions = ["SL","WL","Toggle"];    

    var condition = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0]
        //var condition = c;
        
    console.log("condition:", condition);
    
    unitDefault = "meters";
    unitChoices = ["meters", "feet"];
    
    //use "/attachment/ to get image files in VS"
//    var test_stimuli = [
//      { stimulus: "WL_Stim_1.png"},
//    ];
    
//    for (var i=0; i<setSizes.length; i++) {
//    for (var j=1; j<=nreps; j++){
//        stimuli.push("/attachment/" + setSizes[i] + "present" + j + ".png");
//        stimuli.push("/attachment/" + setSizes[i] + "absent" + j + ".png");
//    }
//}
    
    //Need to assign a condition
    //Probably need to force full screen/ask mike what min pixel dimensions should be
    //should there be a maximum too? probably.
    //for distance estimates, need to figure out what the last unit selected was, and make that the default selection on the next trial
    //get data in the format we want
    //still need instructions
    //still need staircase procedure
    //for toggle condition, need to aggregate the time spent in each view, number of switches, final view
    //maybe give them the negative on the orientation?
    
    allvars = {
        distances: [5,25,50,75,100,150,200],
        orientations: [0,-10,-20,-30],
        numbers: [1,3,6],
        estimate_types: ["Distance", "Orientation", "Number"]
    }
    
    combos = jsPsych.randomization.factorial(allvars, 1);
    
    nunique = combos.length/3
    
    images = [];
    views = [];
    imagenames = ["SL","WL"];
    ntrials = 10;
    switch (condition){
        case "SL":
            views = jsPsych.randomization.sampleWithReplacement(["SL"],combos.length);
            for (var i = 0; i < combos.length; i++) {
                //images.push("SL" + combos[i].distances + combos[i].orientations + combos[i].numbers + ".PNG");
                //tempstr = combos[i].numbers + "_" + combos[i].orientations + "_" + combos[i].distances + "_" + "sl.png";
                tempstr = 6 + "_" + combos[i].orientations + "_" + combos[i].distances + "_sl.png";
                images.push("WL_SL Stimuli Images/" + tempstr);
                
            }
            
            break;
        case "WL":
            views = jsPsych.randomization.sampleWithReplacement(["WL"],combos.length);
            for (var i = 0; i < nunique; i++) {    
                tempstr = 6 + "_" + combos[i].orientations + "_" + combos[i].distances + "_wl.png";
                images.push("WL_SL Stimuli Images/" + tempstr);
            }

            break;
        case "Toggle":
            firstviews = jsPsych.randomization.sampleWithReplacement(["_sl.png","_wl.png"],combos.length);
            for (var i = 0; i < nunique; i++) {    
                tempstr = 6 + "_" + combos[i].orientations + "_" + combos[i].distances + firstviews[i];
                console.log(tempstr);
                images.push("WL_SL Stimuli Images/" + tempstr);
                if (firstviews[i] == "_sl.png"){
                    views.push("SL")
                } else {
                    views.push("WL")
                }    
            }
            
    }
    // }
    test_stimuli = [];
            for (var i = 0; i < images.length; i++) {
                test_stimuli.push({
                    stimulus: images[i],
                    estimate_type: combos[i].estimate_types,
                    data: {view: views[i], distance: combos[i].distances, orientation: combos[i].orientations,
                    number: combos[i].numbers, estimate_type: combos[i].estimate_types, nswitches: 0}
                });
        }
    
    
    
//
//        /* create timeline */
        var timeline = []; 
//        
//

//        
        var questionPrompt = {
          type: "html-keyboard-response",
          stimulus: function(){
              var temp_html = "<p> You will be asked to estimate <span style='color:red;font-weight: bold'>" + jsPsych.timelineVariable('estimate_type',true) + "</span></p>"
              return temp_html;
          },
          choices: jsPsych.NO_KEYS,
          trial_duration: 500,
          post_trial_gap: 500
          };
    
        var image = {
          type: "image-button-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ["Ready"],
          post_trial_gap: 500
          };
    
    var toggle_image = {
        on_start: function(trial){
        if (jsPsych.data.get().last(1).values()[0].view == "WL"){
            trial.stimulus = trial.stimulus.replace("wl", "sl");
//            var tempswitches = trial.data.nswitches
//            console.log(tempswitches, tempswitches+1);
            trial.data = {view: "SL", nswitches: nswitches};
            
        } else if (jsPsych.data.get().last(1).values()[0].view == "SL"){
            trial.stimulus = trial.stimulus.replace("sl", "wl");
//            var tempswitches = trial.data.nswitches
            trial.data = {view: "WL", nswitches: nswitches};
        }
    },
        type: "image-button-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ["Toggle View", "Ready"],
          post_trial_gap: 500,
        data: jsPsych.timelineVariable('data')
        
    }
    
var nswitches = 0;    
    
var loop_node = {
//    on_start: function(trial){
//        console.log(jsPsych.data.get().last(1).values()[0].view == "WL");
//        if (jsPsych.data.get().last(1).values()[0].view == "WL"){
//            console.log("last was WL");
//            console.log(trial.stimulus);
//        }
//    },
//    on_finish: function(data){
//        if(data.values()[0].button_pressed == 0){
//            console.log(trial.stimulus);
//        }
//        
////        trial.data.stimulus_type = 'incongruent';
//    },
    timeline: [toggle_image],
    loop_function: function(data){
        if(data.values()[0].button_pressed == 0){
//            console.log(data.values()[0].stimulus)
            nswitches++;
            console.log(nswitches);
//            stimulus: "SL.PNG";
            return true;
        } else {
            nswitches = 0;
            return false;
        }
    }
}
    
    estimate_html1 = '<p> <div class = "estimate">'
    estimate_html2 = ': <input id = "mynumberinput" name="estimate" type="number" required/>'
    estimate_html3 = '</div><div class = "estimate"><input name="unit" type="radio" value = "feet" id = "feet"> <label for = "feet">Feet</label><br><input type="radio" name="unit" value="meters" id="meters"><label for="meters"> Meters</label><br>'
    estimate_html4 = '</div></p>'
    
    var form_trial = {
        type: 'survey-html-form',
        on_load: function() {
            document.getElementById("mynumberinput").focus();
//                          console.log(trial.data.estimate_type);
//    if (trial.data.estimate_type == "Distance"){
        radiobtn = document.getElementById(unitDefault);
            if (radiobtn != null){
                console.log(radiobtn);
            radiobtn.checked = true;
            }
        
//    }
            
        },
          on_start: function(trial){
//              console.log(trial.data.estimate_type);
//    if (trial.data.estimate_type == "Distance"){
//        radiobtn = document.getElementById(unitDefault);
//        console.log(radiobtn);
//            radiobtn.checked = true;
//    }
    
  },
        
                    
  
        html: function(){
            var temp_type = jsPsych.timelineVariable('estimate_type',true)
            var temp_html = estimate_html1 + temp_type + estimate_html2;
            if (temp_type == "Distance"){
                temp_html += estimate_html3;
            } else if (temp_type == "Orientation"){
                temp_html += '&nbspdegrees';
            } 
            
            temp_html += estimate_html4;
            return temp_html;
        },
        data: jsPsych.timelineVariable('data'),
        on_finish: function(data){
        if(data.estimate_type == "Distance"){
            unitDefault = JSON.parse(data.responses).unit;
        }
        
//        trial.data.stimulus_type = 'incongruent';
    }
    };
    
//stimulus: function(){
//                var html="<img src='"+jsPsych.timelineVariable('face', true)+"'>";
//                html += "<p>"+jsPsych.timelineVariable('name', true)+"</p>";
//                return html;
//            },  
    
//            var questionPrompt = {
//          type: "html-keyboard-response",
//          stimulus: jsPsych.timelineVariable('stimulus'),
//          choices: response_choices,
//          data: jsPsych.timelineVariable('data'),
//          on_finish: function(data){
//            data.correct = data.button_pressed == (data.correct_response);
//          }
//        };
////        
//          var scale = ["No Confidence (Guessing)", "Low Confidence", "Moderate Confidence", "High Confidence", "Full Confidence (Certain)"];
//
//          var likert_trial = {
//              type: 'survey-likert',
//              questions: [
//                {prompt: "How confident were you in your answer?", name: 'Confidence', labels: scale, required: true}
//              ],
//              preamble: function(){
//                  var last_trial_stim = jsPsych.data.get().last(1).values()[0].stimulus;
//                  var last_trial_answer = jsPsych.data.get().last(1).values()[0].button_pressed;
//                  return last_trial_stim + "<p>Your Answer: " + response_choices[last_trial_answer] + "</p>";
//              },
//              scale_width: 750,
//              data: {test_part: 'confidence'}
//          };
//        
//        var feedback = {
//          type: 'html-keyboard-response',
//          stimulus: function(){
//            var last_trial_stim = jsPsych.data.get().last(2).values()[0].stimulus;
//            var last_trial_answer = jsPsych.data.get().last(2).values()[0].button_pressed;
//            var last_trial_correct = jsPsych.data.get().last(2).values()[0].correct;
//            if(last_trial_correct){
//              return last_trial_stim + "<p class = 'correct'>Your Answer: " + response_choices[last_trial_answer] + "</p><p class = 'correct'>Correct!</p>";
//            } else {
//              return last_trial_stim + "<p class = 'incorrect'>Your Answer: " + response_choices[last_trial_answer] + "<p class = 'incorrect'>Wrong.</p>";
//            }
//          },
//          choices: jsPsych.NO_KEYS,
//          trial_duration: 3000,
//          post_trial_gap: 500,
//          data: {test_part: 'feedback'}
//        }
//        
//        var practice_procedure = {
//            timeline: [test, likert_trial, feedback],
//            timeline_variables: practice_stimuli,
//            randomize_order: true,
//            repetitions: 1,
//            sample: {
//                type: 'without-replacement',
//                size: 10,
//            } 
//        };
//        timeline.push(practice_procedure);
//        
//        var test_instructions = {
//            type: "html-keyboard-response",
//            stimulus: "<p>" + instructions6 + "</p>",
//            post_trial_gap: 1000
//        };
//        timeline.push(test_instructions);
      
    if (condition == "Toggle"){
        var test_procedure = {
          timeline: [questionPrompt, loop_node, form_trial],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 1,
            sample: {
                type: 'without-replacement',
                size: ntrials,
            }
        }
    } else {
                    var test_procedure = {
          timeline: [questionPrompt, image, form_trial],
          timeline_variables: test_stimuli,
          randomize_order: true,
          repetitions: 1,
            sample: {
                type: 'without-replacement',
                size: ntrials,
            }
        }
    
    };
        
        timeline.push(test_procedure);
//        
//        var age_options = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
//        var gender_options = ["Male", "Female"];
//        var edu_options = ["Less than high school degree", "High school degree or equivalent (e.g., GED)", "Some college but no degree", "Associate degree", "Bachelor degree", "Graduate degree"];
//
//        
//        var demographics = {
//            type: "survey-multi-choice",
//            questions: [
//                {prompt: "How old are you?", name: 'Age', options: age_options, required:true}, 
//                {prompt: "What is your gender?", name: 'Gender', options: gender_options, required: true},
//                {prompt: "What is the highest level of education you have completed?", name: 'Edu', options: edu_options, required: true}
//            ],
//            data: {test_part: 'demographics'}
//        };
//        timeline.push(demographics);
//        
//        var freeresponse = {
//            type: "survey-text",
//            questions: [
//                {prompt: 'What strategies did you use to make classifications in this task?', placeholder: 'I tended to...', rows:10, columns: 50}
//            ],
//            data: {test_part: 'freeresponse'}
//        }
//        timeline.push(freeresponse);
//
//        
//        var debrief_block = {
//          type: "html-keyboard-response",
//          stimulus: function() {
//
//            var trials = jsPsych.data.get().filter({test_part: 'test'});
//            var correct_trials = trials.filter({correct: true});
//            var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
//            var rt = Math.round(correct_trials.select('rt').mean());
//
//            return "<p>You responded correctly on "+accuracy+"% of the trials.</p>"+
//            "<p>Your average response time was "+rt+"ms.</p>"+
//            "<p>Press any key to complete the experiment. Thank you!</p>";
//
//          }
//        };
//
//        //timeline.push(debrief_block);
//        
//        /* define debrief trial */
//        var debriefscreen = {
//            type: "html-button-response",
//            stimulus: debrief,
//            choices: ["Finished"]
//        };
//        timeline.push(debriefscreen);
//
//        
        jsPsych.init({
            // display_element: "explainable_ai",
            timeline: timeline,
            preload_images: images,
              exclusions: {
    min_width: 1000,
    min_height: 600
  },
            on_trial_start: function() {
                //$('.ui-tooltip').hide();
            },
            on_finish: function() {
                
        jsPsych.data.displayData();
      
            //jsPsych.data.get().filter({test_part: 'test'}).ignore('stimulus').displayData('csv');
            //console.log(jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}, {test_part: 'confidence'}, {test_part: 'demographics'}, {test_part: 'freeresponse'}]).ignore('stimulus').csv());
            //submit(jsPsych.data.get().filter([{test_part: 'practice'}, {test_part: 'test'}, {test_part: 'confidence'}, {test_part: 'demographics'}, {test_part: 'freeresponse'}]).ignore('stimulus').csv());
            //if ("c_set" in variables && variables['c_set'].length > 0) {
            //  setConsumables("explainable_ai", variables['c_set'], consumable_condition);
            //} 
            //payAMT(true, 0.0, true);
            }
       });
//       }
    
})