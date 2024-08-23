import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToolsById } from '../../api/tools';
import { ToolEntity } from '../../models/tools';
import Header from '../../components/Header/Header';
import { accessibilityTagsIntl, featureTagIntl, socialTagsIntl } from '../../models/tag';
import { FormattedMessage, useIntl } from 'react-intl';

const ToolDetail = () => {
    const [tool, setTool] = useState<ToolEntity>({} as ToolEntity);
    const { id } = useParams();
    const intl = useIntl();

    useEffect(() => {
        if (!id) return;
        getToolsById(id)
            .then((response) => {
                console.log(response);
                setTool(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Header />
            <div>
                <div>
                    <div>
                        <h1>{tool.toolsName}</h1>
                        <p>{tool.descEn}</p>
                    </div>
                    <img src={tool.logo} alt={"logo"}/>
                </div>
                <div>
                    {tool.featureTag?.map((feature, index) => {
                        const intlObject = featureTagIntl.find((tag) => tag.value === feature);
                        return (
                            <div key={index}>
                                <FormattedMessage id={intlObject?.label} defaultMessage={intlObject?.defaultMessage} />
                            </div>
                        );
                    })}
                </div>
                <div>
                    <h2>Standout features</h2>
                    <ul>
                        {tool.featuresEn?.map((feature, index) => {
                            return <li key={index}>{feature}</li>;
                        })}
                    </ul>
                </div>
                <div>
                    <h2>Tool Details</h2>
                    <div>
                        <div>
                            <h4>Data Protection</h4>
                            <p>{tool.dataProtectionEn}</p>

                            <h4>Authentication/Verification</h4>
                            <p>{tool.authenticationEn}</p>

                            <h4>Year established</h4>
                            <p>{tool.established}</p>

                            <h4>Number of clients</h4>
                            <p>{tool.noOfClients}</p>
                        </div>
                        <div>
                            <h4>Team</h4>
                            <p>{tool.team}</p>

                            <h4>Countries active</h4>
                            <p>{tool.countries?.join(', ').toUpperCase()}</p>

                            <h4>Next product update session</h4>
                            <p>{tool.nextProductUpdateEn}</p>

                            <h4>Network and partners</h4>
                            <p>{tool.partners}</p>
                        </div>
                        <div>
                            <div>
                                <h4>Accessibility</h4>
                                {tool.accessibilityTag?.map((atag, index) => {
                                    const intlObject = accessibilityTagsIntl.find((tag) => tag.value === atag);
                                    return (
                                        <div key={index}>
                                            <FormattedMessage id={intlObject?.label} defaultMessage={intlObject?.defaultMessage} />
                                        </div>
                                    );
                                })}

                                <h4>Social positioning</h4>
                                {tool.socialPositioningTag?.map((stag, index) => {
                                    const intlObject = socialTagsIntl.find((tag) => tag.value === stag);
                                    return (
                                        <div key={index}>
                                            <FormattedMessage id={intlObject?.label} defaultMessage={intlObject?.defaultMessage} />
                                        </div>
                                    );
                                })}
                            </div>
                            <h4>Contact</h4>
                            <p>{tool.email}</p>
                            <p>{tool.phone}</p>
                            <p>{tool.web}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolDetail;