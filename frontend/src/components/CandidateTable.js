import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateTable = ({ refresh }) => {
    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [candidatesPerPage] = useState(10); // Display 10 candidates per page
    const [filterOption, setFilterOption] = useState(''); // Track selected filter option
    const [genderFilter, setGenderFilter] = useState(''); // Gender filter
    const [experienceFilter, setExperienceFilter] = useState(''); // Experience filter
    const [skillFilters, setSkillFilters] = useState([]); // Skill filters
    const [allSkills, setAllSkills] = useState([]); // Available skills for filtering

    // Fetching candidates and skills on initial render
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/candidates');
                setCandidates(res.data);

                // Extract unique skills from candidates for filtering
                const skills = new Set();
                res.data.forEach(candidate => {
                    candidate.skills.forEach(skill => skills.add(skill));
                });
                setAllSkills([...skills]);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, [refresh]);

    // Filtering candidates based on user input and selected filters
    const filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(search.toLowerCase()) ||
            candidate.phone.includes(search) ||
            candidate.email.toLowerCase().includes(search.toLowerCase());

        // Apply filters based on the selected filter option
        let matchesFilter = true;
        if (filterOption === 'gender') {
            matchesFilter = !genderFilter || candidate.gender === genderFilter;
        } else if (filterOption === 'experience') {
            matchesFilter = !experienceFilter || candidate.experience === experienceFilter;
        } else if (filterOption === 'skills') {
            matchesFilter = skillFilters.length === 0 || skillFilters.some(skill => candidate.skills.includes(skill));
        }

        return matchesSearch && matchesFilter;
    });

    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

    const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container my-4">
            <h2>Candidate List</h2>
            
            {/* Search and Filters Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column w-50">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search candidates..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Combined Filter Dropdown */}
                    <select
                        className="form-control w-30"
                        value={filterOption}
                        onChange={(e) => {
                            const selectedOption = e.target.value;
                            setFilterOption(selectedOption);
                            // Reset other filter states when a new filter is chosen
                            if (selectedOption !== 'skills') {
                                setSkillFilters([]);
                            }
                        }}
                    >
                        <option value="">Select Filter</option>
                        <option value="gender">Gender</option>
                        <option value="experience">Experience</option>
                        <option value="skills">Skills</option>
                    </select>

                    {/* Conditionally render filters based on selected filter option */}
                    {filterOption === 'gender' && (
                        <select
                            className="form-control mt-3"
                            value={genderFilter}
                            onChange={(e) => setGenderFilter(e.target.value)}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    )}

                    {filterOption === 'experience' && (
                        <select
                            className="form-control mt-3"
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                        >
                            <option value="">Select Experience</option>
                            <option value="Fresher">Fresher</option>
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="More than 3 Years">More than 3 Years</option>
                        </select>
                    )}

                    {filterOption === 'skills' && (
                        <select
                            className="form-control mt-3"
                            multiple
                            value={skillFilters}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                setSkillFilters(selectedOptions);
                            }}
                        >
                            {allSkills.map(skill => (
                                <option key={skill} value={skill}>{skill}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {/* Candidates Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Experience</th>
                        <th>Skills</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCandidates.map(candidate => (
                        <tr key={candidate._id}>
                            <td>{candidate.name}</td>
                            <td>{candidate.phone}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.gender}</td>
                            <td>{candidate.experience}</td>
                            <td>{candidate.skills.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center my-3">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-outline-secondary me-2"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`btn btn-outline-secondary me-2 ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn btn-outline-secondary ms-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CandidateTable;
