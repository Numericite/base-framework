import {
  AddIcon,
  CheckCircleIcon,
  CloseIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  AiOutlineCloseCircle,
  AiOutlineFileExcel,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsHourglassSplit } from "react-icons/bs";
import { TStrapiFile } from "../../../pages/api/types";
import { humanFileSize } from "../../../utils/globals/tools";

type UploadZoneProps = {
  onChange(e: React.ChangeEvent<any>): void;
  onRemove(): void;
  value: TStrapiFile | File | undefined;
  name: string;
  width: string | number;
  multiple: boolean;
};

const UploadZone = ({
  onChange,
  onRemove,
  name,
  value,
  width,
  multiple,
}: UploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file, index) => {
      onChange({
        target: {
          name:
            index === 0
              ? name
              : `${name.split(".")[0]}.${(
                  parseInt(name.split(".")[1]) + index
                ).toString()}`,
          value: file,
        },
      } as React.ChangeEvent<any>);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  return value && ("url" in value || value.name !== "empty") ? (
    <Box w={width} p={2}>
      <Box
        borderWidth={1}
        borderColor="gray.200"
        bg="white"
        rounded="lg"
        p={8}
        py={12}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        position="relative"
        h="full"
      >
        <Box position="absolute" top={2} right={2} display="flex">
          {"url" in value ? (
            <CheckCircleIcon color="green" />
          ) : (
            <Box as="span" color="secondary">
              <BsHourglassSplit />
            </Box>
          )}
        </Box>
        {"name" in value && (
          <Box
            position="absolute"
            top={2}
            left={2}
            onClick={onRemove}
            display="flex"
            color="red.400"
            cursor="pointer"
            _hover={{ color: "red" }}
          >
            <AiOutlineCloseCircle />
          </Box>
        )}
        <Box fontSize="3xl" color="gray">
          {"name" in value && value.name.includes(".pdf") ? (
            <AiOutlineFilePdf />
          ) : "name" in value &&
            (value.name.includes(".xls") || value.name.includes(".xlxs")) ? (
            <AiOutlineFileExcel />
          ) : (
            <AiOutlineFileText />
          )}
        </Box>
        <Text fontSize="sm" mt={1}>
          {"name" in value ? value.name : value.url}
        </Text>
        {"size" in value && (
          <Box position="absolute" bottom={1} right={2}>
            <Text as="i" fontSize="xs">
              {humanFileSize(value.size)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Box w={width} p={2}>
      <Box
        {...getRootProps()}
        borderWidth={1}
        borderColor="gray.200"
        bg="white"
        rounded="lg"
        p={8}
        py={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="full"
        cursor="pointer"
      >
        <input {...getInputProps({ multiple })} />
        {isDragActive ? (
          <Text textAlign="center" fontSize="sm" textColor="gray">
            Glissez votre fichier ici...
          </Text>
        ) : (
          <Text textAlign="center" fontSize="sm" textColor="gray">
            <AddIcon fontSize="xl" mb={3} /> <br />
            Glissez un fichier ou cliquez pour parcourir...
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default UploadZone;
