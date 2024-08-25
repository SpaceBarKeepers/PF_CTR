import { useEffect, useState } from 'react';
import {
    CountryFilterArray,
    functionalityFilterArray,
    ToolEntity,
} from '../../models/tools';
import { getToolsAll } from '../../api/tools';
import ButtonColored from '../../components/Button/ButtonColored';
import AutocompleteWhispererInput from '../../components/AutocompleteWhispererInput/AutocompleteWhispererInput';
import './cataloguePage.scss';
import { useNavigate } from 'react-router-dom';
import LayoutPrivateWrapper from '../../wrappers/LayoutPrivateWrapper';
import { shippingCountrySelectArray } from '../../models/countries';

const CataloguePage = () => {
    const [tools, setTools] = useState<ToolEntity[]>([]);
    const [filteredTools, setFilteredTools] = useState<ToolEntity[]>([]);
    const [functionalityFilterExpanded, setFunctionalityFilterExpanded] =
        useState<boolean>(false);
    const [selectedFunctionalityFilter, setSelectedFunctionalityFilter] =
        useState<string[]>([]);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [countryFilter, setCountryFilter] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        getToolsAll()
            .then((response) => {
                setTools(response);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleClickExpandFuntionalityFilter = () => {
        setFunctionalityFilterExpanded((prev) => !prev);
    };

    const handleClickedFunctionalityFilter = (functionality: string) => () => {
        if (selectedFunctionalityFilter.includes(functionality)) {
            setSelectedFunctionalityFilter((prev) =>
                prev.filter((item) => item !== functionality),
            );
        } else {
            setSelectedFunctionalityFilter((prev) => [...prev, functionality]);
        }
    };

    useEffect(() => {
        setFilteredTools(
            tools.filter((tool: ToolEntity) => {
                if (
                    selectedFunctionalityFilter.length > 0 &&
                    !selectedFunctionalityFilter.every((feature) =>
                        tool.featureTag.includes(feature),
                    )
                ) {
                    return false;
                }
                if (
                    nameFilter &&
                    !tool.toolsName.toLowerCase().includes(nameFilter.toLowerCase())
                ) {
                    return false;
                }
                if (countryFilter) {
                    const countryCode = shippingCountrySelectArray.find(item => item.label === countryFilter)?.value;
                    if (countryCode && !tool.countries.includes(countryCode)) {
                        return false;
                    }
                }
                return true;
            }),
        );
    }, [selectedFunctionalityFilter, nameFilter, countryFilter, tools]);

    const handleClickTool = (id: number) => () => {
        navigate(`/tool/${id}`);
    };

    return (
        <LayoutPrivateWrapper>
            <div className={'cataloguePage'}>
                <h1>Catalogue of tools</h1>
                <div className={'cataloguePage__functionalityFilterContainer'}>
                    <div className={'cataloguePage__functionalityFilter'}>
                        {functionalityFilterArray.map((functionality, index) => {
                            if (functionalityFilterExpanded || index < 4) {
                                return (
                                    <div
                                        className={`cataloguePage__functionalityFilterItem ${
                                            selectedFunctionalityFilter.includes(functionality.value)
                                                ? ' cataloguePage__functionalityFilterItem--selected'
                                                : ''
                                        }`}
                                        key={functionality.name}
                                        onClick={handleClickedFunctionalityFilter(
                                            functionality.value,
                                        )}
                                    >
                                        <img src={functionality.icon} alt={''} />
                                        <div>{functionality.name}</div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <ButtonColored
                        onClick={handleClickExpandFuntionalityFilter}
                        childIsLink={false}
                        buttonType={'secondary'}
                    >
                        {functionalityFilterExpanded ? 'Show less' : 'Show more'}
                    </ButtonColored>
                </div>
                <div className={'cataloguePage__searchInputs'}>
                    <AutocompleteWhispererInput
                        options={tools.map((tool) => tool.toolsName)}
                        setState={setNameFilter}
                        placeholder={'Search'}
                        preIcon={"/icons/icon_search.svg"}
                    />
                    <div className={"verticalLine"}/>
                    <AutocompleteWhispererInput
                        options={CountryFilterArray}
                        setState={setCountryFilter}
                        placeholder={'Country active'}
                        preIcon={"/icons/icon_location.svg"}
                    />
                </div>
                <div className={'cataloguePage__tools'}>
                    <div className={'cataloguePage__results'}>
                        {filteredTools.length} results found
                    </div>
                    <div className={'cataloguePage__toolsList'}>
                        {filteredTools.sort((a, b) => a.toolsName.localeCompare(b.toolsName)).map((tool) => (
                            <div
                                className={'cataloguePage__toolsListItem'}
                                key={tool.toolsName}
                                onClick={handleClickTool(tool.id)}

                            >
                                <div className={'cataloguePage__toolsListItemHead'}>
                                    <h2>{tool.toolsName}</h2>
                                    <div
                                        className={'cataloguePage__toolsListItemHead__logoWrapper'}
                                    >
                                        <img src={tool.logo} alt={tool.toolsName} />
                                    </div>
                                </div>
                                <p>{tool.descEn}</p>
                                <ButtonColored
                                    childIsLink={false}
                                >
                                    Open
                                </ButtonColored>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutPrivateWrapper>
    );
};

export default CataloguePage;
