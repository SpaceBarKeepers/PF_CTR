import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { CountryFilterArray, functionalityFilterArray, ToolEntity } from '../../models/tools';
import { getToolsAll } from '../../api/tools';
import ButtonColored from '../../components/Button/ButtonColored';
import AutocompleteWhispererInput from '../../components/AutocompleteWhispererInput/AutocompleteWhispererInput';

const CataloguePage = () => {
    const [tools, setTools] = useState<ToolEntity[]>([]);
    const [filteredTools, setFilteredTools] = useState<ToolEntity[]>([]);
    const [functionalityFilterExpanded, setFunctionalityFilterExpanded] = useState<boolean>(false);
    const [selectedFunctionalityFilter, setSelectedFunctionalityFilter] = useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [countryFilter, setCountryFilter] = useState<string>('');

    useEffect(() => {
        getToolsAll()
            .then((response) => {
                setTools(response);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleClickExpandFuntionalityFilter = () => {
        setFunctionalityFilterExpanded(prev => !prev);
    };

    const handleClickedFunctionalityFilter = (functionality: string) => () => {
        if (selectedFunctionalityFilter.includes(functionality)) {
            setSelectedFunctionalityFilter(prev => prev.filter((item) => item !== functionality));
        } else {
            setSelectedFunctionalityFilter(prev => [...prev, functionality]);
        }
    };

    useEffect(() => {
        setFilteredTools(tools.filter((tool: ToolEntity) => {
            if (selectedFunctionalityFilter.length > 0 && !selectedFunctionalityFilter.includes(tool.functionality)) {
                return false;
            }
            if (nameFilter && !tool.toolsName.toLowerCase().includes(nameFilter.toLowerCase())) {
                return false;
            }
            // TODO: Country filter
            // if (countryFilter && tool.countries !== countryFilter) {
            //     return false;
            // }
            return true;
        }))
    }, [selectedFunctionalityFilter, nameFilter, countryFilter, tools]);

    return (
        <div className={'cataloguePage'}>
            <Header />
            <div className={'cataloguePage__functionalityFilter'}>
                {
                    functionalityFilterArray.map((functionality, index) => {
                        if (functionalityFilterExpanded || index < 4) {
                            return (
                                <div key={functionality.name}
                                     onClick={handleClickedFunctionalityFilter(functionality.name)}>
                                    {functionality.name}
                                </div>
                            );
                        }
                    })
                }
                < ButtonColored
                    onClick={handleClickExpandFuntionalityFilter}
                    childIsLink={false}
                    type={'secondary'}
                >
                    {functionalityFilterExpanded ? 'Show less' : 'Show more'}
                </ButtonColored>
            </div>
            <div>
                <AutocompleteWhispererInput
                    options={tools.map(tool => tool.toolsName)}
                    setState={setNameFilter}
                />
                <AutocompleteWhispererInput
                    options={CountryFilterArray}
                    setState={setCountryFilter}
                />
            </div>
            <div>
                {
                    filteredTools.map((tool) => (
                        <div key={tool.toolsName}>
                            {tool.toolsName}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CataloguePage;