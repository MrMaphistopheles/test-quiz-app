"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function Edit({
  defaultQuestion,
  id,
}: {
  defaultQuestion: string;
  id: string;
}) {
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const { mutate, isPending } = api.quiz.changeQuestion.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleChange = () => {
    mutate({ id, definition: value });
  };
  return (
    <>
      <Button color="secondary" onClick={onOpen}>
        Edit question
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Change question
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center gap-2">
                  <Input
                    type="text"
                    variant="flat"
                    placeholder="change question"
                    defaultValue={defaultQuestion}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  <Button
                    color="primary"
                    onClick={handleChange}
                    isLoading={isPending}
                  >
                    Update
                  </Button>
                </div>
                <br />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
