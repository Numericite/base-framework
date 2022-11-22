import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

// TODO: Select field contents when a prompt() loads
// TODO: Fix Promise<> return types instead of using any

enum ModalType {
  Alert,
  Confirm,
  Prompt,
  PromptNumber,
}

export interface Modals {
  alert: (message: string) => Promise<any>;
  confirm: (message: string) => Promise<any>;
  prompt: (message: string, defaultValue?: string) => Promise<any>;
  promptNumber: (message: string, defaultValue?: number) => Promise<any>;
}

const defaultContext: Modals = {
  alert() {
    throw new Error("<ModalProvider> is missing");
  },
  confirm() {
    throw new Error("<ModalProvider> is missing");
  },
  prompt() {
    throw new Error("<ModalProvider> is missing");
  },
  promptNumber() {
    throw new Error("<ModalProvider> is missing");
  },
};

const Context = createContext<Modals>(defaultContext);

interface AnyEvent {
  preventDefault(): void;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [currentFile, setCurrentFile] = useState<File | undefined>();
  const input = useRef<HTMLInputElement>(null);
  const ok = useRef<HTMLButtonElement>(null);

  const createOpener = useCallback(
    (type: ModalType) =>
      (
        message: string,
        defaultValue = type === ModalType.PromptNumber ? 0 : ""
      ) =>
        new Promise((resolve) => {
          const handleClose = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            resolve(null);
          };

          const handleCancel = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            if (type === ModalType.Prompt || type === ModalType.PromptNumber)
              resolve(null);
            else resolve(false);
          };

          const handleOK = (e?: AnyEvent) => {
            e?.preventDefault();
            setModal(null);
            if (type === ModalType.Prompt) resolve(input.current?.value);
            else if (type === ModalType.PromptNumber)
              resolve(
                input.current ? parseInt(input.current?.value) : input.current
              );
            else resolve(true);
          };

          setModal(
            <Modal
              isOpen={true}
              onClose={handleClose}
              initialFocusRef={
                type === ModalType.Prompt || type === ModalType.PromptNumber
                  ? input
                  : ok
              }
            >
              <ModalOverlay />
              <ModalContent>
                <ModalBody mt={5}>
                  <Stack spacing={5}>
                    <Text> {message}</Text>
                    {(type === ModalType.Prompt ||
                      type === ModalType.PromptNumber) && (
                      <Input
                        ref={input}
                        type={
                          type === ModalType.PromptNumber ? "number" : "text"
                        }
                        defaultValue={defaultValue}
                      />
                    )}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  {type !== ModalType.Alert && (
                    <Button mr={3} variant="ghost" onClick={handleCancel}>
                      Annuler
                    </Button>
                  )}
                  <Button
                    onClick={handleOK}
                    ref={ok}
                    variant={type !== ModalType.Alert ? "solid" : "ghost"}
                  >
                    {type !== ModalType.Alert ? "Valider" : "Fermer"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          );
        }),
    [children]
  );

  return (
    <Context.Provider
      value={{
        alert: createOpener(ModalType.Alert),
        confirm: createOpener(ModalType.Confirm),
        prompt: createOpener(ModalType.Prompt),
        promptNumber: createOpener(ModalType.PromptNumber),
      }}
    >
      {children}
      {modal}
    </Context.Provider>
  );
};

const useModals = () => useContext(Context);

export default useModals;
