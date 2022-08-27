import React, {
	createContext,
	Dispatch,
	FC,
	useEffect,
	useState,
	useReducer,
} from "react";
import { MainStateActions, setAllDocuments, setMainConfig } from "./actions";
import {
	IMainState,
	initialState,
	mainStateReducer,
	MainStateReducer,
} from "./reducer";
import { DocViewerProps } from "../types";

const DocViewerContext = createContext<{
	state: IMainState;
	dispatch: Dispatch<MainStateActions>;
}>({ state: initialState, dispatch: () => null });

const AppProvider: FC<DocViewerProps> = (props) => {
	const { children, documents, config, pluginRenderers } = props;
	const [documentsState, setDocumentsState] = useState<any>([])
	const [newDocs, setNewDocs] = useState<IMainState | any>({
		...initialState,
		documents: documents || [],
		currentDocument: documents && documents.length ? documents[0] : undefined,
		config,
		pluginRenderers,
	})
	// console.log('newDocs :: ', newDocs)
	const [fullState, setFullState] = useState<IMainState | any>({ ...newDocs })
	// console.log('initialState :: ', initialState)

	useEffect(() => {
		// console.log('documentsState :: ', documentsState)
		// console.log('documents :: ', documents)
		const newDoc = documents?.map((doc, i) => doc.uri === documentsState[i]?.uri).filter(v => !v)
		// console.log('newDoc :: ', newDoc)
		if (newDoc?.length > 0) {
			setDocumentsState(documents)
			setFullState({ ...newDocs })
		}
	}, [documents]);

	const [state, dispatch] = useReducer<MainStateReducer>(mainStateReducer, fullState);

	// On initial load, and whenever they change,
	// replace documents with the new props passed in
	useEffect(() => {
		const newDoc = documents?.map((doc, i) => doc.uri === documentsState[i]?.uri).filter(v => !v)
		if (newDoc?.length > 0) {
			dispatch(setAllDocuments(documents));
			config && dispatch(setMainConfig(config));
		}
	}, [documents]);

	return (
		<DocViewerContext.Provider value={{ state, dispatch }}>
			{children}
		</DocViewerContext.Provider>
	);
};

export { DocViewerContext, AppProvider };
