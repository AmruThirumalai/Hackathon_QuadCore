document.addEventListener("DOMContentLoaded", function() {
    // Select all checkbox wrappers (assumed to be the parent of the SVG)
    const checkboxWrappers = document.querySelectorAll('.svg-wrapper');
    const calculateButton = document.querySelector('.calculate-button button'); // The calculate button
    const resultText = document.querySelector('#resultText'); // The result text box in the footer

    // When any checkbox is clicked, toggle the "checked" class
    checkboxWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });

    // Calculate and display results when the button is clicked
    calculateButton.addEventListener('click', function() {
        // Collect all checked data-skills
        let selectedSkills = [];
        checkboxWrappers.forEach(wrapper => {
            if (wrapper.classList.contains('checked')) {
                // Add the data-skill value to the selectedSkills array
                selectedSkills.push(wrapper.getAttribute('data-skill'));
            }
        });

        // Determine trade career based on selected skills
        let careerResult = getCareer(selectedSkills);

        // Display the career result in the result area
        resultText.textContent = careerResult;
    });

    // Function to match skills with a career
    function getCareer(skills) {
        // Define a set of simple rules for career suggestions based on skills
        if (  
            (  (skills.includes('soldering') && skills.includes('circuitry'))  ||  (skills.includes('automation') && skills.includes('circuitry')) || (skills.includes('design') && skills.includes('circuitry'))  )  
            && !skills.includes('dis-circuitry')
           ) { return "Electrician! These trade workers are skilled professionals who specialize in the installation, maintenance, and repair of electrical systems. They work with wiring, circuits, and electrical equipment to ensure safety and functionality in homes, businesses, and industrial settings. Electricians often troubleshoot and resolve electrical issues, install lighting, and ensure that electrical systems comply with safety regulations. Their expertise is essential for both new constructions and renovations.";

        } else if (
            (  (skills.includes('cad') && skills.includes('pipefitting')) || (skills.includes('cad') && skills.includes('design')) || (skills.includes('design') && skills.includes('pipefitting'))   )
            && !skills.includes('dis-pipefitting')
            ) { return "Plumber! These trade workers are professionals who install and repair piping systems that carry water, gas, or waste in residential, commercial, and industrial settings. They ensure that pipes are properly connected, check for leaks, and troubleshoot any plumbing issues. Plumbers also install fixtures like sinks, toilets, and water heaters. Their work is crucial for maintaining sanitation and efficient water systems.";

        } else if (
            (  (skills.includes('woodworking') && skills.includes('dis-soldering')) || (skills.includes('woodworking') && skills.includes('design')) || (skills.includes('design') && skills.includes('dis-welding'))  ) 
            && !skills.includes('dis-woodworking')
            ) { return "Carpenter! These trade workers work with wood to build, install, and repair structures like cabinets, doors, windows, and frameworks for buildings. They measure, cut, and assemble wood materials for both functional and aesthetic purposes. Carpenters also work with other materials like drywall, fiberglass, and metal, and often focus on constructing and finishing homes, furniture, and cabinetry.";
        } else if (
            (  (skills.includes('welding') && skills.includes('automation')) || (skills.includes('dis-design') && skills.includes('automation')) || (skills.includes('welding') && skills.includes('soldering'))  ) 
            && !skills.includes('dis-welding')
            ) { return "Welder! These trade workers join metal parts together using high heat and specialized tools to create strong and durable bonds. They work in construction, manufacturing, and maintenance, and are often required to cut, shape, and repair metal components. Welders use various welding techniques, such as MIG, TIG, or arc welding, depending on the materials and project requirements. Their work is vital in industries like automotive, aerospace, and heavy machinery.";
        } else if (
            (  (skills.includes('automation') && skills.includes('cad')) || (skills.includes('3dprinting') && skills.includes('cad')) || (skills.includes('automation') && skills.includes('3dprinting'))   )  
            && !skills.includes('dis-automation')
            ) { return "Manufacturer! These trade workers work with raw materials to create finished products through processes like assembly, production line work, and quality control. They operate machines, tools, and equipment to transform materials into parts or products used in a wide range of industries, including automotive, electronics, and consumer goods. Their role often involves managing the manufacturing process to ensure efficiency, safety, and quality standards.";
        } else if (
            (  (skills.includes('automation') && skills.includes('welding')) || (skills.includes('design') && skills.includes('soldering')) || (skills.includes('automation') && skills.includes('design'))   )  
            && !skills.includes('dis-automation')
            ) { return "Mechanic! These trade workers diagnose, repair, and maintain mechanical systems, such as engines, brakes, transmissions, and other vehicle or machine components. They work on cars, trucks, motorcycles, industrial machines, and even airplanes. Mechanics use their technical knowledge and hands-on skills to ensure that machines run smoothly, and they are essential in keeping vehicles and machinery in safe working condition.";
        } else {
            return "General Laborer! It looks like you have a wide range of skills and interests that don’t fit into one specific trade, and that’s a great thing! Many of your talents can apply to a variety of industries and roles. Whether it's hands-on work, problem-solving, or adapting to different environments, your versatility gives you the flexibility to excel in multiple areas. The world of trades is vast, and your broad skill set means you can thrive in many different types of work. Keep exploring – your perfect fit could be just around the corner!";
        }
    }
});