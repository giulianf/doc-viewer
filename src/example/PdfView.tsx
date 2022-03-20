import DocViewer, { DocViewerRenderers } from '../DocViewer';

const PdfView = () => {
  return (
		<div style={{height: '99vh'}}>
    <DocViewer
			documents={[
				{ uri: require("../_example-files_/pdf.pdf").default, fileName: 'ABC' }, // Local File
				{ uri: require("../_example-files_/sample.pdf").default }, // Local File

			]}
			pluginRenderers={DocViewerRenderers}
			config={{header: {
				// disableFileName: true,
				// disableDocumentNav: true
			}}}
    />
		</div>
  );
}

export default PdfView;
