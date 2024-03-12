import { formatText } from '@/utils/formatText';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import React from 'react';
import { IoCopy } from 'react-icons/io5';
import { useToast } from '@/components/ui/use-toast';
import copy from 'clipboard-copy';

export const AccordionDetails = ({
  data,
  deployedContract,
}: {
  data: any;
  deployedContract: boolean;
}) => {
  const { toast } = useToast();

  const handleCopyToClipboard = async (textToCopy: string, toCopy: string) => {
    try {
      await copy(textToCopy);
      toast({
        description: `Successfully Copied ${toCopy}`,
        style: { backgroundColor: 'green', color: 'white' },
      });
    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex items-center">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="w-full">
              CONTRACT CODE
            </AccordionTrigger>
            <AccordionContent className="bg-gray-200 rounded-xl p-3 ">
              <pre>
                {formatText(data.sourceCode).map((line, index) => (
                  <p key={index} className="mb-1">
                    {line}
                  </p>
                ))}
              </pre>
            </AccordionContent>
          </AccordionItem>
          {deployedContract && (
            <>
              <AccordionItem value="item-2" className="w-full">
                <AccordionTrigger className="w-full">
                  CONTRACT ADDRESS
                </AccordionTrigger>
                <AccordionContent className="bg-gray-200 rounded-xl p-3 ">
                  <div>{data.address}</div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="w-full">
                <AccordionTrigger className="w-full">
                  VERIFY CONTRACT INSTRUCTIONS
                </AccordionTrigger>
                <AccordionContent className="bg-gray-200 rounded-xl p-3">
                  <span>
                    To verify your recently deployed contract, follow the
                    following steps:
                  </span>
                  <ol className="flex flex-col gap-3 list-decimal pl-5 pt-2">
                    <li>
                      Go to{' '}
                      <a
                        href={`https://mumbai.polygonscan.com/verifyContract?a=${data.address}`}
                        target="_blank"
                        className="text-blue-400 underline"
                      >
                        Verify Page
                      </a>{' '}
                      to begin verification.
                    </li>
                    <b>Fill in the following:</b>
                    <li>
                      Please select Compiler Type:{' '}
                      <b> Solidity (Single-file).</b>
                    </li>
                    <li>
                      Please select Compiler Version:{' '}
                      <b> v0.8.24+commit.e11b9ed9</b>{' '}
                      <i className="pl-5">
                        Make sure{' '}
                        <b>Un-Check to show all nightly Commits also</b> is
                        checked.
                      </i>
                    </li>
                    <li>
                      Please select Open Source License Type:{' '}
                      <b>MIT License (MIT)</b>
                    </li>
                    <li>
                      Click the <b>Continue</b> button.
                    </li>
                    <li>
                      Copy the Contract code form below and Paste the code in
                      the text are in the new page.
                    </li>
                    <li>
                      Click the <b>Verify and Publish</b> button
                    </li>
                    <li>
                      Successfully, created, deployed and verified your smart
                      contract.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </div>
      <div className="w-full flex items-center justify-end flex-wrap gap-5">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() =>
            handleCopyToClipboard(data.sourceCode, 'Contract code')
          }
        >
          <IoCopy className="h-4 w-4 text-gray-300 hover:text-gray-600 " />
          Contract Code
        </div>
        {deployedContract && (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() =>
              handleCopyToClipboard(data.address, 'Contract Address')
            }
          >
            <IoCopy className="h-4 w-4 text-gray-300 hover:text-gray-600 " />
            Contract Address
          </div>
        )}
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => handleCopyToClipboard(data.abi, 'ABI')}
        >
          <IoCopy className="h-4 w-4 text-gray-300 hover:text-gray-600 " />
          ABI
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => handleCopyToClipboard(data.bytecode, 'Bytecode')}
        >
          <IoCopy className="h-4 w-4 text-gray-300 hover:text-gray-600 " />
          Bytecode
        </div>
      </div>
    </div>
  );
};
