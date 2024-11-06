import React, { useState } from 'react';
import axios from 'axios';

const AddCandidate = ({ onCandidateAdded }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [experience, setExperience] = useState('Fresher');
    const [skills, setSkills] = useState('');
    const [customSkill, setCustomSkill] = useState('');  // State to hold custom skill if "Other" is selected
    const [education, setEducation] = useState('');

    // Sample list of available skills (single select dropdown)
    const availableSkills = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS', 'HTML', 'Python', 'Java'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // If "Other" is selected for skills, add the custom skill
        const finalSkills = skills === 'Other' ? customSkill : skills;
        
        const newCandidate = { name, phone, email, gender, experience, skills: finalSkills, education };
        await axios.post('http://localhost:5000/api/candidates', newCandidate);
        
        onCandidateAdded();  // Callback to refresh the candidate list
        
        // Reset form fields
        setName('');
        setPhone('');
        setEmail('');
        setGender('Male');
        setExperience('Fresher');
        setSkills('');
        setCustomSkill('');
        setEducation('');
    };

    return (
        <div className="mb-4">
            <h2>Add Candidate</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Gender dropdown */}
                <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {/* Experience dropdown */}
                <select
                    className="form-control"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                >
                    <option value="Fresher">Fresher</option>
                    <option value="1 Year">1 Year</option>
                    <option value="2 Years">2 Years</option>
                    <option value="3 Years">3 Years</option>
                    <option value="More than 3 Years">More than 3 Years</option>
                </select>

                {/* Skills dropdown */}
                <select
                    className="form-control"
                    value={skills}
                    onChange={(e) => {
                        const selectedSkill = e.target.value;
                        setSkills(selectedSkill);
                        // Reset custom skill input when a different skill is selected
                        if (selectedSkill !== 'Other') {
                            setCustomSkill('');
                        }
                    }}
                >
                    <option value="">Select Skill</option>
                    {availableSkills.map((skill) => (
                        <option key={skill} value={skill}>
                            {skill}
                        </option>
                    ))}
                    <option value="Other">Other</option> {/* "Other" option added */}
                </select>

                {/* If "Other" is selected in skills, show a custom skill input */}
                {skills === 'Other' && (
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Enter your skill"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                    />
                )}

                {/* Education dropdown */}
                <select
                    className="form-control"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                >
                    <option value="">Select Education</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary mt-3">
                    Add Candidate
                </button>
            </form>
        </div>
    );
};

export default AddCandidate;
