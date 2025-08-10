import { Dispatch, useContext, useEffect } from "react";
import { DocViewerContext } from "../state";
import {
  MainStateActions,
  setDocumentLoading,
  updateCurrentDocument,
} from "../state/actions";
import { IMainState } from "../state/reducer";
import { DocRenderer } from "../types";
import { defaultFileLoader, FileLoaderComplete, arrayBufferFileLoader, binaryStringFileLoader, textFileLoader } from "./fileLoaders";
import { useRendererSelector } from "./useRendererSelector";

/**
 * Custom Hook for loading the current document into context
 */
export const useDocumentLoader = (): {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  CurrentRenderer: DocRenderer | null | undefined;
} => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { currentFileNo, currentDocument, prefetchMethod } = state;

  const { CurrentRenderer } = useRendererSelector();

  const documentURI = currentDocument?.uri || "";

  useEffect(
    () => {
      if (!currentDocument) return;
      if (currentDocument.fileType !== undefined) return;

      // If fileData is a Blob, derive type locally without fetching
      const fd: any = currentDocument.fileData as any;
      if (typeof Blob !== "undefined" && fd instanceof Blob) {
        dispatch(
          updateCurrentDocument({
            ...currentDocument,
            fileType: fd.type || undefined,
          })
        );
        return;
      }

      const controller = new AbortController();
      const { signal } = controller;

      // Avoid HEAD for blob: URIs
      const method = prefetchMethod ? prefetchMethod : (documentURI.startsWith("blob:") ? "GET" : "HEAD");

      fetch(documentURI, {
        method,
        signal,
      }).then((response) => {
        const contentTypeRaw = response.headers.get("content-type");
        const contentTypes = contentTypeRaw?.split(";") || [];
        const contentType = contentTypes.length ? contentTypes[0] : undefined;

        dispatch(
          updateCurrentDocument({
            ...currentDocument,
            fileType: contentType || undefined,
            status: response.status,
          })
        );
      });

      return () => {
        controller.abort();
      };
    },
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]
  );

  useEffect(() => {
    if (!currentDocument || CurrentRenderer === undefined) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fileLoaderComplete: FileLoaderComplete = (fileReader) => {
      if (!currentDocument || !fileReader) {
        dispatch(setDocumentLoading(false));
        return;
      }

      let updatedDocument = { ...currentDocument };
      if (fileReader.result !== null) {
        updatedDocument.fileData = fileReader.result;
      }

      dispatch(updateCurrentDocument(updatedDocument));
      dispatch(setDocumentLoading(false));
    };

    // If fileData already provided, handle it
    if (currentDocument.fileData !== undefined) {
      const fd: any = currentDocument.fileData as any;
      // If it's a Blob, convert it to what the renderer expects
      if (typeof Blob !== "undefined" && fd instanceof Blob) {
        const reader = new FileReader();
        reader.addEventListener("loadend", () => fileLoaderComplete(reader));

        const desiredLoader = CurrentRenderer?.fileLoader;
        // Choose how to read the Blob based on renderer's loader preference
        if (desiredLoader === arrayBufferFileLoader) {
          reader.readAsArrayBuffer(fd);
        } else if (desiredLoader === binaryStringFileLoader) {
          reader.readAsBinaryString(fd);
        } else if (desiredLoader === textFileLoader) {
          reader.readAsText(fd);
        } else {
          // default behavior consistent with defaultFileLoader
          reader.readAsDataURL(fd);
        }
      } else {
        // Already a string or ArrayBuffer => nothing to load
        dispatch(setDocumentLoading(false));
      }

      return () => {
        controller.abort();
      };
    }

    if (CurrentRenderer === null) {
      dispatch(setDocumentLoading(false));
    } else if (CurrentRenderer.fileLoader !== undefined) {
      CurrentRenderer.fileLoader?.({ documentURI, signal, fileLoaderComplete });
    } else {
      defaultFileLoader({ documentURI, signal, fileLoaderComplete });
    }

    return () => {
      controller.abort();
    };
  }, [CurrentRenderer]);

  return { state, dispatch, CurrentRenderer };
};
