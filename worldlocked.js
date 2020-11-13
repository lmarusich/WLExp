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
    //limit text inputs to numbers, something about conditional timelines?
    //for distance estimates, need to figure out what the last unit selected was, and make that the default selection on the next trial
    //get data in the format we want
    //still need instructions
    //still need staircase procedure
    //still need toggle condition
    
    
    allvars = {
        distances: [5,25,50,75,100,150,200],
        orientations: [0,10,20,30],
        numbers: [1,3,6],
        estimate_types: ["Distance", "Orientation", "Number"]
    }
    
    combos = jsPsych.randomization.factorial(allvars, 1);
    
    nunique = combos.length/3
    
    images = [];
    imagenames = ["SL","WL"];
    ntrials = 2;
    switch (condition){
        case "SL":
            images = jsPsych.randomization.sampleWithReplacement(["SL.PNG"],2);
            for (var i = 0; i < nunique; i++) {
                //images.push("SL" + combos[i].distances + combos[i].orientations + combos[i].numbers + ".PNG");
                tempstr = "SL" + combos[i].distances + combos[i].orientations + combos[i].numbers + ".PNG";
            }
    //                practice_stims = practice_census;
    //                definitions = census_definitions;
    //                response_choices = ['Less than 88K', 'More than 88K'];
    //                instructions = census_instructions;
            break;
        case "WL":
            images = jsPsych.randomization.sampleWithReplacement(["WL.PNG"],ntrials);
    //                practice_stims = practice_compas;
    //                definitions = compas_definitions;
    //                response_choices = ['Will Not Re-offend', 'Will Re-offend'];
    //                instructions = compas_instructions;
            break;
        case "Toggle":
            images = jsPsych.randomization.sampleWithReplacement(["SL.PNG","WL.PNG"],ntrials);
    }
    // }
    test_stimuli = [];
            for (var i = 0; i < images.length; i++) {
                //tempstr = condition + combos[i].distances + combos[i].orientations + combos[i].numbers + ".PNG";
                //test_stimuli.push({stimulus: tempstr})
                test_stimuli.push({
                    stimulus: images[i],
                    distance: combos[i].distances,
                    orientation: combos[i].orientations,
                    number: combos[i].numbers,
                    estimate_type: combos[i].estimate_types
                });
        }
    
    

    
//        
//        var predictors = Object.keys(definitions);
//        var names = [];
//
//        var tableheader = "<table class = 'absolute', border='1'><tr>";
//        for (var x in predictors){
//            tableheader += "<th title = '" + definitions[predictors[x]] + "'>" + predictors[x] + " <span style = 'font-weight:normal'>&#9432</span></th>";
//        }
//        tableheader += "</tr>";
//        
//        function createStimuli(stim, type) {
//            var tempstimuli = tableheader + "<tr>";
//            var names = Object.keys(stim);
//            skipvars = Object.keys(stim[names[0]][0]).splice(- 2,2);
//            //for (var x = 0; x < nvars; x++) {
//            for (x in stim[names[0]][0]){
//                if (skipvars.includes(x)){
//                    continue;
//                }
//                
//                if (stim[names[0]][0][x] === "?"){
//                    tempstimuli += "<td>Unknown</td>";
//                } else {
//                    tempstimuli += "<td>" + stim[names[0]][0][x] + "</td>";
//                }
//            } 
//            tempstimuli += "</table><br>";
//            
//            if (type === "example"){
//                tempstim = [];
//                tempstim.push(tempstimuli, tempstimuli, tempstimuli);
//            };
//            
//
//
//            if (condition != "Control"){
//                //add AI Prediction
//                tempstimuli += "<p><strong>AI Predicts: </strong>" + stim[names[0]][0].prediction + "</p><br>";
//                if (type === "example"){tempstim[1] = tempstimuli; tempstim[2] = tempstimuli;}
//                if (condition == "AI_expl"){
//                    //add AI Explanation
//                    tempstimuli += "<strong>AI Explanation: </strong><div class = 'parent'><ul>";
//                    var tempexpl = stim[names[1]][0];
//                    var counter = 0;
//                    for (var x in tempexpl) {
//                        
//                        if ((x === "class") || (tempexpl[x].length == 0)){
//                            continue;
//                        }
//                        
//                        if (counter > 0){
//                            tempstimuli += ", <span style = 'font-size:67%'>AND</span></li>";
//                        }
//                        tempstimuli += "<li>" + x + ": " + tempexpl[x];
//                        counter++;
//                    } 
//                    tempstimuli += "</li></ul></div><p> </p>"
//                    
//                    if (type === "example"){
//                        tempstim[2] = tempstimuli;
//                        
//                    }
//                }
//            }
//            
//            if (type === "example"){return tempstim;}
//            
//            tempobj = {};
//            tempobj['stimulus'] = tempstimuli;
//            tempobj['data'] = {test_part: type, correct_response: stim.cr, stimindex: stim.index, AI_corr: stim.AI_corr, dataset: dataset, condition: condition};
//
//            return tempobj
//        }
//        
//        //create one example
//        var example_stimulus = createStimuli(practice_stims[1], 'example');
//        
//        //should be 10 practice trials
//        var practice_stimuli = [];
//        for (var i = 0; i < practice_stims.length; i++) {
//            practice_stimuli.push(createStimuli(practice_stims[i], 'practice'));
//        }
//
//        // should be 100 trials
//        var test_stimuli = [];
//        for (var i = 0; i < dataset_stims.length; i++) {
//            test_stimuli.push(createStimuli(dataset_stims[i], 'test'));
//        }
//
//        /* create timeline */
        var timeline = []; 
//        
//
//        var instructionset1 = {
//            type: "html-button-response",
//            choices: ["Next"],
//            post_trial_gap: 0,
//            timeline: [
//                {stimulus: consent, choices: ["I agree"]},
//                {stimulus: instructions[0], post_trial_gap: 500},
//                {stimulus: instructions[1], post_trial_gap: 500},
//                {stimulus: example_stimulus[0]},
//                {stimulus: example_stimulus[0] + "<p>Here is the information for one person</p><p>Note that you can hover over the name of each variable to see its definition again</p>"}
//            ]
//        }
//        timeline.push(instructionset1);
//                    
//        if (condition != "Control"){           
//            var instructai = {
//                type: "html-button-response",
//                choices: ["Next"],
//                post_trial_gap: 0,
//                timeline: [
//                    {stimulus: example_stimulus[0] + ai_instructions},
//                    {stimulus: example_stimulus[1]}
//                ]
//            };
//            timeline.push(instructai);    
//        }
//        
//        if (condition === "AI_expl"){    
//            var instructexpl1 = {            
//                type: "html-button-response",
//                choices: ["Next"],
//                post_trial_gap: 0,
//                timeline: [
//                    {stimulus: example_stimulus[1] + aiexpl_instructions},
//                    {stimulus: example_stimulus[2]}
//                ]
//            };
//            timeline.push(instructexpl1);        
//        }
//        
//        var instructionset2 = {
//            type: "html-button-response",
//            post_trial_gap: 1000,
//            timeline: [
//                {stimulus: example_stimulus[2] + instructions[2], choices: response_choices},
//                {stimulus: "<p>" + prac_instructions + "</p>", choices: ["Next"]}
//            ]
//        };
//        timeline.push(instructionset2);
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
        type: "image-button-response",
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: ["Toggle View", "Ready"],
          post_trial_gap: 500
        
    }
    
    
    
var loop_node = {
    on_start: function(trial){
        //console.log(trial.stimulus);
        if (jsPsych.data.get().last(1).values()[0].stimulus == "WL.PNG"){
            console.log("toggled!");
        }
//        trial.data.stimulus_type = 'incongruent';
    },
//    on_finish: function(trial){
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
//            console.log(trial.stimulus);
//            stimulus: "SL.PNG";
            return true;
        } else {
            return false;
        }
    }
}
    
    estimate_html1 = '<p> <div class = "estimate">'
    estimate_html2 = ': <input id = "mynumberinput" name="estimate" type="number" required/>'
    estimate_html3 = '</div><div class = "estimate"><input name="unit" type="radio" value = "feet"> <label for = "feet">Feet</label><br><input type="radio" name="unit" value="meters"><label for="meters"> Meters</label><br>'
    estimate_html4 = '</div></p>'
    
    var form_trial = {
        type: 'survey-html-form',
        on_load: function() {
            document.getElementById("mynumberinput").focus();
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