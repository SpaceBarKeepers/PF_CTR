import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToolsById } from '../../api/tools';
import { functionalityFilterArray, ToolEntity } from '../../models/tools';
import Header from '../../components/Header/Header';
import {
    accessibilityTagsIntl,
    featureTagIntl,
    socialTagsIntl,
} from '../../models/tag';
import { FormattedMessage } from 'react-intl';
import './toolsDetails.scss';
import Footer from '../../components/Footer/Footer';
import { useSilentTokenRefresh } from '../../lib/useSilentTokenRefresh';

const ToolDetail = () => {
    const [tool, setTool] = useState<ToolEntity>({} as ToolEntity);
    const { id } = useParams();
    const getToken = useSilentTokenRefresh();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        if (!id) return;
        getToken().then((token) => {
            getToolsById(token, id)
                .then((response) => {
                    setTool(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        })
            .catch((error) => {
                console.error(error);
            });
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const formatUrl = (url: string) => {
        // Check if the URL starts with 'http://' or 'https://'
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        } else {
            // Prepend 'https://' if it does not
            return 'https://' + url;
        }
    };

    return (
        <div className={'toolDetail'}>
            <Header />
            <main>
                <div className={'toolDetail__head'}>
                    <div className={'toolDetail__headText'}>
                        <h1>{tool.toolsName}</h1>
                        <p>{tool.descEn}</p>
                    </div>
                    <div className={'toolDetail__logoWrapper'}>
                        <img src={tool.logo} alt={'logo'} />
                    </div>
                </div>
                <div className={'toolDetail__featureTags'}>
                    {tool.featureTag?.map((feature, index) => {
                        const intlObject = featureTagIntl.find(
                            (tag) => tag.value === feature,
                        );
                        const tagObject = functionalityFilterArray.find(
                            (tag) => tag.value === feature,
                        );
                        return (
                            <div key={index} className={'toolDetail__featureTagsTag'}>
                                <img src={tagObject?.icon} alt={''} />
                                <FormattedMessage
                                    id={intlObject?.label}
                                    defaultMessage={intlObject?.defaultMessage}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className={'toolDetail__features'}>
                    <h2>Standout features</h2>
                    <ul>
                        {tool.featuresEn?.map((feature, index) => {
                            return <li key={index}>{feature}</li>;
                        })}
                    </ul>
                </div>
                <div className={'toolDetail__toolDetails'}>
                    <h2>Tool Details</h2>
                    <div className={'toolDetail__toolDetailsContainer'}>
                        <div className={'toolDetail__toolDetailsLeft'}>
                            <h4>Data Protection</h4>
                            <p>{tool.dataProtectionEn ? tool.dataProtectionEn : 'N/A'}</p>

                            <h4>Authentication/Verification</h4>
                            <p>{tool.authenticationEn ? tool.authenticationEn : 'N/A'}</p>

                            <h4>Year established</h4>
                            <p>{tool.established ? tool.established : 'N/A'}</p>

                            <h4>Number of clients</h4>
                            <p>{tool.noOfClients ? tool.noOfClients : 'N/A'}</p>
                        </div>
                        <div className={'toolDetail__toolDetailsCenter'}>
                            <h4>Team</h4>
                            <p>{tool.team ? tool.team : 'N/A'}</p>

                            <h4>Countries active</h4>
                            <p>{tool.countries?.join(', ').toUpperCase()}</p>

                            <h4>Next product update session</h4>
                            <p>
                                {tool.nextProductUpdateEn ? tool.nextProductUpdateEn : 'N/A'}
                            </p>

                            <h4>Network and partners</h4>
                            <p>{tool.partners ? tool.partners : 'N/A'}</p>
                        </div>
                        <div className={'toolDetail__toolDetailsRight'}>
                            <div className={'toolDetail__toolDetailsRightTagContainer'}>
                                <div className={'toolDetail__toolDetailsRightTagContainerTag'}>
                                    <h4>Accessibility</h4>
                                    <div
                                        className={
                                            'toolDetail__toolDetailsRightTagContainerTagContainer'
                                        }
                                    >
                                        {!!tool.accessibilityTag?.length
                                            ? tool.accessibilityTag?.map((atag, index) => {
                                                const intlObject = accessibilityTagsIntl.find(
                                                    (tag) => tag.value === atag,
                                                );
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            'toolDetail__toolDetailsRightTagContainerTagContainerTag'
                                                        }
                                                    >
                                                        <img src={intlObject?.icon} alt={''} />
                                                        <FormattedMessage
                                                            id={intlObject?.label}
                                                            defaultMessage={intlObject?.defaultMessage}
                                                        />
                                                    </div>
                                                );
                                            })
                                            : 'N/A'}
                                    </div>
                                </div>

                                <div>
                                    <h4>Social positioning</h4>
                                    <div
                                        className={
                                            'toolDetail__toolDetailsRightTagContainerTagContainer'
                                        }
                                    >
                                        {!!tool.socialPositioningTag?.length
                                            ? tool.socialPositioningTag?.map((stag, index) => {
                                                const intlObject = socialTagsIntl.find(
                                                    (tag) => tag.value === stag,
                                                );
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            'toolDetail__toolDetailsRightTagContainerTagContainerTag'
                                                        }
                                                    >
                                                        <img src={intlObject?.icon} alt={''} />
                                                        <FormattedMessage
                                                            id={intlObject?.label}
                                                            defaultMessage={intlObject?.defaultMessage}
                                                        />
                                                    </div>
                                                );
                                            })
                                            : 'N/A'}
                                    </div>
                                </div>
                            </div>
                            <h4>Contact</h4>
                            <div className={'toolDetail__toolDetailsRightContact'}>
                                <img src={'/icons/icon_email.svg'} alt={''} />
                                <p>{tool.email ? tool.email : 'N/A'}</p>
                            </div>
                            <div className={'toolDetail__toolDetailsRightContact'}>
                                <img src={'/icons/icon_phone.svg'} alt={''} />
                                <p>{tool.phone ? tool.phone : 'N/A'}</p>
                            </div>
                            <div className={'toolDetail__toolDetailsRightContact'}>
                                <img src={'/icons/icon_web.svg'} alt={''} />
                                <p>
                                    {tool.web ? (
                                        <a href={formatUrl(tool.web)}>{tool.web}</a>
                                    ) : (
                                        'N/A'
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {(tool.caseStudyOnePublishedEn || tool.caseStudyTwoPublishedEn) && (
                    <div className={'toolDetail__caseStudies'}>
                        <h2>Case Studies</h2>
                        {tool.caseStudyOnePublishedEn && (
                            <div className={'toolDetail__caseStudiesContainer'}>
                                <div
                                    className={'toolDetail__caseStudiesContainer__imgWrapper'}
                                    style={{ backgroundImage: `url(${tool.caseStudyOneImgEn})` }}
                                ></div>
                                {tool.caseStudyOneImgEn && (
                                    <img
                                        src={tool.caseStudyOneImgEn}
                                        alt={''}
                                        style={{ display: 'none' }}
                                    />
                                )}
                                <div className={'toolDetail__caseStudiesContainerRight'}>
                                    <h3>{tool.caseStudyOneTitleEn}</h3>
                                    {(tool.caseStudyOneHighlightOneEn ||
                                        tool.caseStudyOneHighlightTwoEn ||
                                        tool.caseStudyOneHighlightThreeEn ||
                                        tool.caseStudyOneHighlightFourEn) && (
                                        <ul>
                                            {tool.caseStudyOneHighlightOneEn && (
                                                <li>{tool.caseStudyOneHighlightOneEn}</li>
                                            )}
                                            {tool.caseStudyOneHighlightTwoEn && (
                                                <li>{tool.caseStudyOneHighlightTwoEn}</li>
                                            )}
                                            {tool.caseStudyOneHighlightThreeEn && (
                                                <li>{tool.caseStudyOneHighlightThreeEn}</li>
                                            )}
                                            {tool.caseStudyOneHighlightFourEn && (
                                                <li>{tool.caseStudyOneHighlightFourEn}</li>
                                            )}
                                        </ul>
                                    )}
                                    <p>{tool.caseStudyOneDescEn}</p>
                                </div>
                            </div>
                        )}
                        {tool.caseStudyTwoPublishedEn && (
                            <div className={'toolDetail__caseStudiesContainer'}>
                                <div
                                    className={'toolDetail__caseStudiesContainer__imgWrapper'}
                                    style={{ backgroundImage: `url(${tool.caseStudyTwoImgEn})` }}
                                ></div>
                                {tool.caseStudyTwoImgEn && (
                                    <img
                                        src={tool.caseStudyTwoImgEn}
                                        alt={''}
                                        style={{ display: 'none' }}
                                    />
                                )}
                                <div className={'toolDetail__caseStudiesContainerRight'}>
                                    <h3>{tool.caseStudyTwoTitleEn}</h3>
                                    {(tool.caseStudyTwoHighlightOneEn ||
                                        tool.caseStudyTwoHighlightTwoEn ||
                                        tool.caseStudyTwoHighlightThreeEn ||
                                        tool.caseStudyTwoHighlightFourEn) && (
                                        <ul>
                                            {tool.caseStudyTwoHighlightOneEn && (
                                                <li>{tool.caseStudyTwoHighlightOneEn}</li>
                                            )}
                                            {tool.caseStudyTwoHighlightTwoEn && (
                                                <li>{tool.caseStudyTwoHighlightTwoEn}</li>
                                            )}
                                            {tool.caseStudyTwoHighlightThreeEn && (
                                                <li>{tool.caseStudyTwoHighlightThreeEn}</li>
                                            )}
                                            {tool.caseStudyTwoHighlightFourEn && (
                                                <li>{tool.caseStudyTwoHighlightFourEn}</li>
                                            )}
                                        </ul>
                                    )}
                                    <p>{tool.caseStudyTwoDescEn}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {!!tool.feedEn?.length && (
                    <div className={'toolDetail__feed'}>
                        <h2>Feed</h2>
                        <div className={'toolDetail__feedContainer'}>
                            {tool.feedEn.map((feed, index) => {
                                return <p key={index}>{feed}</p>;
                            })}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ToolDetail;
